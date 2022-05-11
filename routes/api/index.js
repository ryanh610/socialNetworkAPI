const router = require('express').router;
const userRoutes = require('./userRoute.js');
const thoughtRoutes = require('./thoughtRoute');

router.use('./users', userRoutes);
router.use('./thoughts', thoughtRoutes);

module.exports = router;