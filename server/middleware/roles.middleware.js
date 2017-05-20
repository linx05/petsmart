const ConnectRoles = require('connect-roles');
const combine = require('../services/middleware/combine-middleware');
const tokenMiddleware = require('./token_resource_match.middleware');

let auth = require('../services/auth/passport-jwt')();

let user = new ConnectRoles({
	failureHandler: function (req, res, action) {
		// optional function to customise code that runs when
		// user fails authorisation
		let accept = req.headers.accept || '';
		res.status(403).json('Access Denied - You don\'t have permission to: ' + action);
	}
});

user.use('public', function () {
	return true;
});

user.use('user', function (req) {
	return (req.user.level === 'user' || req.user.level === 'employee' || req.user.level === 'admin');
});

user.use('userOrAdmin', function (req) {
	return (req.user.level === 'user' || req.user.level === 'admin');
});

user.use('employee', function (req) {
	return (req.user.level === 'employee' || req.user.level === 'admin');
});

user.use(function (req) {
	return (req.user.level === 'admin');
});

user.use('admin', (req) => req.user.level === 'admin');

module.exports = {
	rolesMiddleware: user.middleware,
	public         : combine([auth.authenticate(), user.can('public')]),
	user           : combine([auth.authenticate(), user.can('user')]),
	userOrAdmin    : combine([auth.authenticate(), user.can('userOrAdmin')]),
	employee       : combine([auth.authenticate(), user.can('employee')]),
	admin          : combine([auth.authenticate(), user.can('admin')])
};



