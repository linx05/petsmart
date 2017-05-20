module.exports = function (app) {
	//setup static content
	app.use('/public',  express.static(path.join(__dirname, 'public')));
	app.use('/',        express.static(path.join(__dirname, '../dist')));
	app.use('/assets',  express.static(path.join(__dirname, '../client/assets')));
};
