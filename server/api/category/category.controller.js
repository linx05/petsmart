const Category          = require('./category.model').Category;
const resourceService = require('../../services/resource/resource.service');

function index(req, res) {
	resourceService.get(Category, req.query)
		.then(category => res.status(200).json(category))
		.catch(error => handleError(res, error));
}

function show(req, res) {
	resourceService.find(Category, req.params.id)
		.then(category => res.status(200).json(category))
		.catch(error => handleError(res, error));
}

function create(req, res) {
	resourceService.add(Category,req.body)
	.then(category => res.status(201).json(category))
	.catch(error => handleError(res, error));
}

function update(req, res) {
	delete req.body._id;

	resourceService.edit(Category, req.params.id, req.body)
		.then(category => res.status(201).json(category))
		.catch(error => handleError(res, error));
}

function destroy(req, res) {
	resourceService.remove(Category, req.params.id)
		.then(data => res.status(204).send('No Content'))
		.catch(error => handleError(res, error, error === 'Not Found' ? 404 : 400));
}

function handleError(res, err = 'Invalid Request', code = 422) {
	return res.status(code).send(err);
}

module.exports = {
	index,
	show,
	create,
	update,
	destroy
};
