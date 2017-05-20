const passport = require('passport');
const passportJWT = require('passport-jwt');
const conf = require('../../config/auth');
const confenv = require('../../config/environment');
const jwt = require('jwt-simple');
const mailGun = require('../mail/mailer.service');
const forgotRoute = confenv.site + "/#/forgot/";

let reset = {
	from   : 'notifications@cesarlaredo.me',
	subject: 'Recuperar contraseña - Unidos Transport',
};

let expires = Math.floor(Date.now() / 1000) + (60 * 60);//1 hora
let token		= null;
let payload =	null;

const languages = {
	'english' : 'EN',
	'spanish' : 'ES'
};

function generateJwtResetClaims(user) {
	return {
		sub: user.id,
		exp: expires
	};
}

function generatePayloadRes(user) {
	return generateJwtResetClaims(user);
}

function generatePasswordMail(email, token, language = 'english') {
	reset.to = email;
	let   tokenR = forgotRoute + token;
	const resetTemp = fs.readFileSync(`server/templates/mail/reset.template${languages[language]}.html`, 'utf8');
	reset.html = resetTemp.replace('restoreToken2',tokenR);
	return mailGun.send(reset);
}

function newPassword(user) {
		payload = generatePayloadRes(user);
		token 	= jwt.encode(payload, conf.jwtSecret);
		let userM 		= user.email;
		return generatePasswordMail(userM, token, user.settings.language);
}

module.exports = {
	newPassword : newPassword
};
