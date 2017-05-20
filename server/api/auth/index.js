let auth = require('../../services/auth/passport-jwt')();

exports = module.exports = (socketio) => {
	let controller = require('./auth.controller')(socketio);
	let router = express.Router();

	router.get('/', auth.authenticate(), controller.all);
	router.get('/logout', auth.authenticate(), controller.logout);
	router.post('/token', controller.token);
	router.get('/token/validate',auth.authenticate(), controller.validateToken);

	return router;
};
