module.exports = function (app, socketio) {
	app.use('/api/auth',         require('./api/auth')(socketio));
	app.use('/api/password',     require('./api/password'));
	app.use('/api/users',        require('./api/user'));
	app.use('/api/categories',   require('./api/category'));
};
