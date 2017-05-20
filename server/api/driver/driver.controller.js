const Driver          = require('./driver.model.js').Driver;
const resourceService = require('../../services/resource/resource.service');

function index(req, res) {
	resourceService.get(Driver, req.query)
		.then(drivers => res.status(200).json(drivers))
		.catch(error => handleError(res, error));
}

function show(req, res) {
	resourceService.find(Driver, req.params.id)
		.then(driver => res.status(200).json(driver))
		.catch(error => handleError(res, error));
}

function create(req, res) {
	resourceService.add(Driver, req.body)
		.then(driver => res.status(201).json(driver))
		.catch(error => handleError(res, error));
}

function update(req, res) {
	delete req.body._id;

	resourceService.edit(Driver, req.params.id, req.body)
		.then(driver => res.status(201).json(driver))
		.catch(error => handleError(res, error));
}

function destroy(req, res) {
	resourceService.remove(Driver, req.params.id)
		.then(data => res.status(204).send('No Content'))
		.catch(error => handleError(res, error, error === 'Not Found' ? 404 : 400));
}

function handleError(res, err, code = 400) {
    return res.status(code).send(err);
}

module.exports = {
	index,
	show,
	create,
	update,
	destroy
};
