const Router = require('express')

const controller = require('../controllers/controller');
const authMiddleware = require('../middlewares/authMiddleware');
const dataMiddleware = require('../middlewares/dataMiddleware');

const router = new Router();

router.post('/signin', dataMiddleware, controller.singin);
router.post('/signup', controller.singup);
router.get('/info',authMiddleware, controller.info);
router.get('/latency', controller.latency);
router.get('/logout', controller.logout);

module.exports = router;