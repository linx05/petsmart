const Movement        = require('./movement.model').Movement;
const Product         = require('../product/product.model').Product;
const resourceService = require('../../services/resource/resource.service');
const populate        = 'products.product products.product.category creator ' +
	'related_movement related_movement.products.product related_movement.products.product.category ' +
	'related_movement.branch';

function applyAmountToInventory (movement) {
	return Promise.all(_.map(movement.products, item => {
		return Product.findById(item.product).exec()
		.then(product => {
			product.inventory += item.amount;
			return product.save();
		})
		.then(product => movement);
	}));
}

function index (req, res) {
	return resourceService.get(Movement, req.query, populate)
	.then(movements => res.status(200).json(movements))
	.catch(error => handleError(res, error));
}

function show (req, res) {
	resourceService.find(Movement, req.params.id, populate)
	.then(movement => res.status(200).json(movement))
	.catch(error => handleError(res, error));
}

function create (req, res) {
	let move;
	resourceService.add(Movement, req.body)
	.then(movement => {
		move = movement;
		return applyAmountToInventory(movement);
	})
	.then(products => res.status(201).json(move))
	.catch(error => handleError(res, error));
}

function update (req, res) {
	delete req.body._id;

	resourceService.edit(Movement, req.params.id, req.body, populate)
	.then(movement => applyAmountToInventory(movement))
	.then(movement => res.status(201).json(movement))
	.catch(error => handleError(res, error));
}

function destroy (req, res) {
	resourceService.remove(Movement, req.params.id)
	.then(data => res.status(204).send('No Content'))
	.catch(error => handleError(res, error, error === 'Not Found' ? 404 : 400));
}

function handleError (res, err = 'Invalid Request', code = 422) {
	console.log(err);
	return res.status(code).send(JSON.stringify(err));
}

module.exports = {
	index,
	show,
	create,
	update,
	destroy
};
