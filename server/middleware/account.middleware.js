const auth            = require('../services/auth/passport-jwt')();
const combine         = require('../services/middleware/combine-middleware');
const resourceService = require('../services/resource/resource.service');
const User            = require('../api/user/user.model').User;

function index(req, res, next) {
	const { level } = req.user;

	return next();
}

function show(req, res, next) {
	return req.user.id === req.params.id ? next() : updateOrDestroy(req, res, next);
}

function create(req, res, next) {
	const isValid = validate(req.user.level, req.user.company, req.body);

	return isValid ? next() : handleError(res);
}

function updateOrDestroy(req, res, next) {
	const { level, company } = req.user;

	if (level !== 'user') {
		return next();
	}

	resourceService.find(User, req.params.id)
		.then((user) => {
			const isValid = validate(level, company, user);

			return isValid ? next() : handleError(res);
		})
		.catch(error => next());
}

function validate(requestLevel, requestCompany, resource) {
	if (requestLevel !== 'user') return true;

	return (resource.level === 'clientTracker' && '' + resource.company === '' + requestCompany);
}

function handleError(res) {
	return res.status(403).json('Access Denied');
}

module.exports = {
	index: combine([auth.authenticate(), index]),
	show: combine([auth.authenticate(), show]),
	create: combine([auth.authenticate(), create]),
	update: combine([auth.authenticate(), updateOrDestroy]),
	destroy: combine([auth.authenticate(), updateOrDestroy]),
};
