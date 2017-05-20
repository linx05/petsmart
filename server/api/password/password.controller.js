const User = require('../user/user.model').User;
const conf = require('../../config/auth');
const jwt = require('jwt-simple');
const passwordService = require('../../services/password/password.service');
let accountData = {
	local: {
		password: null
	}
};

function handleError(res, err, code = 400) {
	return res
		.status(code)
		.send(err);
}

function objNotFound(error, res) {
	return handleError(res, 'User not found', 404);
}


function userFoundResToken(user, res) {
		passwordService.newPassword(user);
		return res.status(200).send('OK');
}

function updatePassword (id , password, res){
	User.findById(id, function (err, user) {
		if (err) {
			return handleError(res, err);
		}
		if (!user) {
			return res.status(404).send('Not Found');
		}
		let updated  = Object.assign(user, password);
		updated.save(function (err) {
			if (err) {
				return handleError(res, err);
			}
			return res.status(200).send('Password changed');
		});
	});
}

	exports.resetToken = function (req, res) {
		if (req.body.name) {
			let promise = User.findOne({
				$or: [
					{ email: { $regex : new RegExp(req.body.name + '$', 'i') } },
					{ 'local.username': { $regex : new RegExp(req.body.name + '$', 'i') } },
				]
			})
				.exec();

			return promise
				.then(user => userFoundResToken(user, res))
				.catch(error => objNotFound(error, res));
		}
		objNotFound(null, res);
	};

	exports.readToken = function (req, res) {
		let decoded = jwt.decode(req.body.token, conf.jwtSecret);
		if(decoded){
			let id = decoded.sub;
			accountData.local.password = req.body.newpassword;
			return updatePassword(id, accountData, res);
		}
	};
