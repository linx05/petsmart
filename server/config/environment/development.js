// Development specific configuration
// ==================================
module.exports = {
	// MongoDB connection options
	mongo: {
		uri: process.env.MONGOLAB_URI ||
		process.env.MONGOHQ_URL ||
		process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME ||
		'mongodb://GasAdmin:ASuperPlace@ds159200.mlab.com:59200/gas-express'
	}
};