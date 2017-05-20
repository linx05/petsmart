const jwt = require('jwt-simple');
const conf = require('../../config/auth');

function generateToken (payload) {
	return jwt.encode(payload, conf.jwtSecret);
}

function generateUserToken (user) {
	let payload = generateUserPayload(user);
	return generateToken(payload);
}

function generateJwtClaims (userClaims) {
	let claims = {
		sub: userClaims.id
	};
	return Object.assign({}, userClaims, claims);
}

function generateUserClaims (user) {
	return {
		id      : user.id,
		name    : user.full_name,
		level   : user.level,
		company : user.company,
		language: user.settings ? user.settings.language : undefined,
	};
}
function generateUserPayload (user) {
	return generateJwtClaims(generateUserClaims(user));
}
module.exports = {
	generateToken    : generateToken,
	generateUserToken: generateUserToken
};
