const router = require('express').Router();

// import api routes
const apiRoutes = require('./api');

// execute api routes
router.use('/api', apiRoutes);

module.exports = router;
