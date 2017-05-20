const Sale         = require('./sale.model').Sale;
const Product         = require('../product/product.model').Product;
const resourceService = require('../../services/resource/resource.service');

function filterSalesByLevel (sales, user) {
	sales = Array.isArray(sales) ? sales : [sales];
	if (user.level === 'employee') {
		sales = _.filter(sales, sale =>sale.salesman._id === user._id);
	}
	return Promise.resolve(sales);
}

function applyAmountToInventory (sale) {
	return Promise.all(_.map(sale.items, item => {
		return Product.findById(item.product._id).exec()
		.then(product => {
			product.inventory -= item.amount;
			return product.save();
		})
		.then(product => sale);
	}));
}

function index (req, res) {
	resourceService.get(Sale, req.query, 'salesman')
	.then(sales => filterSalesByLevel(sales, req.user))
	.then(sales => res.status(200).json(sales))
	.catch(error => handleError(res, error));
}

function show (req, res) {
	resourceService.find(Sale, req.params.id, 'salesman')
	.then(sale => filterSalesByLevel(sale, req.user))
	.then(sales => res.status(200).json(sales[0]))
	.catch(error => handleError(res, error));
}

function create (req, res) {
	resourceService.add(Sale, req.body)
	.then(sale => applyAmountToInventory(sale))
	.then(sale => res.status(201).json(sale))
	.catch(error => handleError(res, error));
}

function update (req, res) {
	delete req.body._id;

	resourceService.edit(Sale, req.params.id, req.body)
	.then(sale => applyAmountToInventory(sale))
	.then(sale => res.status(201).json(sale))
	.catch(error => handleError(res, error));
}

function destroy(req, res) {
	resourceService.remove(Sale, req.params.id)
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
