let dotenv = require('dotenv').config({silent: true});
const path = require("path");
const _    = require("lodash");

function requiredProcessEnv (name) {
	if (!process.env[name]) {
		throw new Error('You must set the ' + name + ' environment variable');
	}
	return process.env[name];
}
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const ENV                                = process.env.APP_ENV || 'development';
// All configurations will extend these options
// ============================================
const all = {

	api: process.env.API_URL || 'http://localhost:9000',

	site: process.env.SITE || (process.env.HTTPS_MODE ? 'https://localhost:3000' : 'http://localhost:3000'),

	env: process.env.NODE_ENV,

	// Root path of server
	root: path.normalize(__dirname + '/../../..'),

	// Server port
	port: process.env.PORT || 9000,

	// Server IP
	ip: process.env.IP || '0.0.0.0',

	// Should we populate the DB with sample data?
	seedDB: process.env.SEED_DB ? eval(process.env.SEED_DB) : false,

	seedUser: process.env.SEED_USER ? eval(process.env.SEED_USER) : false,
	// Secret for session, you will want to change this and make it an environment variable
	secrets  : {
		session: process.env.SECRET || 'myAppSecretForNode'
	},
	// List of user roles
	userRoles: ['guest', 'user', 'admin'],

	// MongoDB connection options
	mongo: {
		options: {
			db: {
				safe: true
			}
		}
	},

	client: {
		ENV_VARS: {
			apiUrl: process.env.API_URL || process.env.SITE || 'http://localhost:9000'
		}
	},

	email: {
		from        : process.env.EMAIL_FROM || 'noreply@unidostransport.com',
		notification: process.env.EMAIL_NOTIFICATION || 'notification@unidostransport.com'
	},

	upload: {
		location: process.env.UPLOAD_LOCATION ?
			path.normalize(process.env.UPLOAD_LOCATION) :
			path.normalize(path.join(path.dirname(require.main.filename), './uploads'))
	},

	templateLocation: process.env.TEMPLATE_LOCATION || 'server/templates',

	aws: {
		id    : process.env.AMAZON_ID || '',
		secret: process.env.AMAZON_SECRET || '',
		region: process.env.AMAZON_REGION || 'us-east-1',
		s3    : {
			bucket: process.env.S3_BUCKET || 'unidos-transport'
		}
	},

	https: process.env.HTTPS_MODE || false

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
	all,
	require('./' + ENV + '.js') || {});
