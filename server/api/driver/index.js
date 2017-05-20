const auth             = require('../../services/auth/passport-jwt')();
const controller       = require('./driver.controller.js');
const routesMiddleware = require('../../middleware/roles.middleware');
const router           = express.Router();

router.get('/', auth.authenticate(), controller.index);
router.get('/:id', auth.authenticate(), controller.show);
router.post('/', routesMiddleware.employee, controller.create);
router.put('/:id', routesMiddleware.employee, controller.update);
router.patch('/:id', routesMiddleware.employee, controller.update);
router.delete('/:id', routesMiddleware.employee, controller.destroy);

module.exports = router;
