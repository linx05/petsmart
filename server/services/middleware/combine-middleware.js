let connect = require('connect'); // we require connect

module.exports = function (mids) {
    const chain = connect();
    mids.forEach(function (middleware) {
        chain.use(middleware);
    });
    return chain;
};
