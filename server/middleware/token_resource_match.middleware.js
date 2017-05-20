const combine = require('../services/middleware/combine-middleware');
const User = require('../api/user/user.model').User;

let auth = require('../services/auth/passport-jwt')();

function user (req, res, next) {
    if (req.user != undefined) {
        next();
    }
    else {
        res.status(401).send('Invalid User or Token!');
    }
}

module.exports = combine([auth.authenticate(), user]);
