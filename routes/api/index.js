const router = require('express').Router();

// import routes
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// execute routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
