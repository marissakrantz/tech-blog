const router = require('express').Router();
const webRoutes = require('./webRoutes');
const apiRoutes = require('./api')

router.use('/', webRoutes);
router.use('/api', apiRoutes);

module.exports = router;