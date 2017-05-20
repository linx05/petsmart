const auth              = require('../../services/auth/passport-jwt')();
const controller        = require('./user.controller');
const router            = express.Router();
const routesMiddleware  = require('../../middleware/roles.middleware');
const accountMiddleware = require('../../middleware/account.middleware');

router.get('/',       auth.authenticate(),          accountMiddleware.index,   controller.index);
router.get('/all',    auth.authenticate(),          controller.index);
router.get('/levels', auth.authenticate(),          controller.listUserLevels);
router.get('/:id',    auth.authenticate(),          accountMiddleware.show,    controller.show);
router.get('/search', auth.authenticate(), controller.search);
router.post('/',      routesMiddleware.userOrAdmin, accountMiddleware.create,  controller.createLocalAccount);
router.put('/:id',    auth.authenticate(),          accountMiddleware.update,  controller.update);
router.patch('/:id',  auth.authenticate(),          accountMiddleware.update,  controller.update);
router.delete('/:id', routesMiddleware.userOrAdmin, accountMiddleware.destroy, controller.destroy);

module.exports = router;
