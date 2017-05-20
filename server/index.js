global.express  = require('express');
global.path     = require('path');
global.fs       = require('fs');
global._        = require('lodash');
global.config   = require('./config/environment');
global.mongoose = require('mongoose');
global.rootServerPath 	= path.dirname(require.main.filename);
global.rootProjectPath 	= path.dirname(path.normalize(rootServerPath, '../'));

// const useStrict = require('use-strict');
const cors      = require('cors');
let auth		= require('./services/auth/passport-jwt')();
// Use native promises for mongoose
mongoose.Promise = global.Promise;

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function (err) {
		if (config.role === 'api') {
			console.error('MongoDB connection error: ' + err);
			process.exit(-1);
		}
	}
);

const app = express();

//enable CORS for our app
app.use(cors());
//Add passport to application
app.use(auth.initialize());

const server = require('http').createServer(app);

let socketio = require('socket.io')(server, {
	serveClient: config.env !== 'production',
	path       : '/socket.io'
});

// Populate DB with sample data
if (config.seedDB === true) {
	require('./config/seed')(config.seedUser);
}
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app, socketio);
require('./static')(app);

// Start server
server.listen(config.port, config.ip, function () {
	console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
