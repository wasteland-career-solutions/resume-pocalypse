const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dataRoutes = require('./dataRoutes');
const authRoutes = require('./authRoutes');

router.use('/users', userRoutes);
router.use('/data', dataRoutes);
router.use('/auth', dataRoutes);

module.exports = router;
