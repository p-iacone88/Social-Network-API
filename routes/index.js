// import Express router
const router = require('express').Router(); 
// import API routes module
const apiRoutes = require('./api-routes');
// Use API routes in '/api' path
router.use('/api',apiRoutes);
// Middleware to handle 404
router.use((req, res)=>{
    return res.status(404).send('Not found');

});

module.exports = router;
