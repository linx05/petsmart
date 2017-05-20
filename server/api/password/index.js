let controller = require('./password.controller');
let router = express.Router();

router.post('/resetToken', controller.resetToken);
router.post('/readToken', controller.readToken);

module.exports = router;
