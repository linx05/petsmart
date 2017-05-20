const auth = require('../../services/auth/passport-jwt')();
const controller = require('./product.controller');
const router = express.Router();
const routesMiddleware = require('../../middleware/roles.middleware');

router.get('/',       routesMiddleware.employee, controller.index);
router.get('/:id',    routesMiddleware.employee, controller.show);
router.post('/',      routesMiddleware.admin, controller.create);
router.put('/:id',    routesMiddleware.admin, controller.update);
router.patch('/:id',  routesMiddleware.admin, controller.update);
router.delete('/:id', routesMiddleware.admin, controller.destroy);

module.exports = router;
