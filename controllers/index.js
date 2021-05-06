// dashboard, home, and api routes middleware for exportation on this file 
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashBoardRoutes = require('./dashboard-routes');

router.use('/dashboard', dashBoardRoutes)
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports= router;