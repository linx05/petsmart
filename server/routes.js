module.exports = function (app, socketio) {
	app.use('/api/auth',         require('./api/auth')(socketio));
	app.use('/api/password',     require('./api/password'));
	app.use('/api/users',        require('./api/user'));
	app.use('/api/drivers',      require('./api/driver'));
	app.use('/api/products',     require('./api/product'));
	app.use('/api/categories',   require('./api/category'));
	app.use('/api/movements',    require('./api/movement'));
	app.use('/api/sales',        require('./api/sale'));
};
