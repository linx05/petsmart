const fs           = require('fs');
const serverConfig = require('./server/config/environment');

function ngConfig() {
	const api = serverConfig.client.ENV_VARS.apiUrl;
	const path = './client/app/app.config.js';
	const content = `angular
	.module('app.services')
	.constant('ENV_VARS', {
		'apiUrl': '${api}'
	});`;

	return fs.writeFileSync(path, content);
}

ngConfig();
