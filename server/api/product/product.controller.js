const Product         = require('./product.model').Product;
const resourceService = require('../../services/resource/resource.service');

function index (req, res) {
	resourceService.get(Product, req.query, 'category')
	.then(product => res.status(200).json(product))
	.catch(error => handleError(res, error));
}

function show (req, res) {
	resourceService.find(Product, req.params.id, 'category')
	.then(product => res.status(200).json(product))
	.catch(error => handleError(res, error));
}

function create (req, res) {
	resourceService.add(Product, req.body)
	.then(product => res.status(201).json(product))
	.catch(error => handleError(res, error));
}

function update (req, res) {
	delete req.body._id;

	resourceService.edit(Product, req.params.id, req.body)
	.then(product => res.status(201).json(product))
	.catch(error => handleError(res, error));
}

function destroy(req, res) {
	resourceService.remove(Product, req.params.id)
	.then(data => res.status(204).send('No Content'))
	.catch(error => handleError(res, error, error === 'Not Found' ? 404 : 400));
}

function handleError (res, err = 'Invalid Request', code = 422) {
	console.log(err);
	return res.status(code).send(err);
}

module.exports = {
	index,
	show,
	create,
	update,
	destroy
};
