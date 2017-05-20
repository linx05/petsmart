/**
 * Express configuration
 */
const express        = require('express');
const compression    = require('compression');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const errorHandler   = require('errorhandler');
const morgan         = require('morgan');

module.exports = function (app) {
	const env = app.get('env');

	app.use(compression());
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(morgan('dev'));

	if ('development' === env || 'test' === env) {
		// app.use(require('connect-livereload')());
		app.use(errorHandler()); // Error handler - has to be last
	}
};
