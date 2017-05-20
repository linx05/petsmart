const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');
const mailConfig = require('../../config/mail');

const User = require('../../api/user/user.model').User;

const auth = {
	auth: {
		api_key: mailConfig.mailgunApiSecret,
		domain : 'cesarlaredo.me'
	}
};

let noti = {
	from   : config.email.from,
	subject: 'Nuevo evento en uno de sus fletes - Unidos Transport',
};

const nodemailerMailgun = nodemailer.createTransport(mailgun(auth));


function send (mailOptions = {from: noti.from}) {
	nodemailerMailgun.sendMail(mailOptions, function (err, info) {
		if (err) {
			console.log('Email Error: ' + err);
		}
		else {
			console.log('Email Response: ' + info.message);
		}
	});
}

function sendPromise (mailOptions) {
	return new Promise((resolve, reject) => {
		nodemailerMailgun.sendMail(mailOptions, function (err, info) {
			if (err) return reject(err);
			else {
				console.log('Response: ' + info.message);
				return resolve(info);
			}
		});
	});
}

function newEvent (userID, shipment) {
	let tokenR = shipmentRoute + shipment;
	const notiTemp = fs.readFileSync('../../templates/mail/noti.templateES.html', 'utf8');
	noti.html = notiTemp.replace('restoreToken2', tokenR);
	return getUserNotifications(userID);
}

function getUserNotifications (userID) {
	User.findById(userID, function (err, user) {
		if (user.settings && user.settings.notifications) {
			noti.to = user.email;
			return send(noti);
		}
	});
}

module.exports = {
	send       : send,
	sendPromise: sendPromise,
	newEvent   : newEvent
};
