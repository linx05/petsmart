const passport = require('passport');
const User = require('../user/user.model').User;
const jwt = require('../../services/auth/jwt.service');


function handleError(res, err, code = 400) {
	return res
		.status(code)
		.send(err);
}

function objNotFound(error = 'User not found', res) {
	return handleError(res, error, 404);
}

function userFoundToken(user, req, res) {
	if (user.validPassword(req.password)) {
		let token = jwt.generateUserToken(user);
		return res.json({token});
	}
	return handleError(res, 'User not found', 404);
}

exports = module.exports = (socketio)=> {

	function all(req, res) {
		let user = req.user;
		if (user) {
			return res.json({user});
		}
		return handleError(res, 'no User');
	}

	function validateToken(req, res) {
		return all(req, res);
	}

	function logout(req, res) {
		const user = req.user;
		let code = 200;
		_.map(socketio.sockets.clients().connected, (e)=> {
			if (e != undefined) {
				if (e.decoded_token.id === user.id) {
					e.disconnect();
					console.log('disconnecting user: ', user.id);
					code = 201;
				}
			}
		});
		return res.status(code).json();
	}

	function token(req, res) {
		if (req.body.login && req.body.password) {
			let promise = User.findOne({
				$or: [
					{ 'email': { $regex : new RegExp(req.body.login + '$', 'i') } },
					{ 'local.username': { $regex : new RegExp(req.body.login + '$', 'i') } },
				]
			})
				.select('+local.password')
				.exec();

			return promise
				.then(user => userFoundToken(user, req.body, res))
				.catch(error => objNotFound(error, res));
		}
		return objNotFound(null, res);
	}

	return {
		all,
		logout,
		token,
		validateToken
	}
};
