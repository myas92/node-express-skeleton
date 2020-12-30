const express=require('express');
const  router=express.Router();
const placeRouters = require("./places/routes");
const userRouters = require("./users/routes");


router.use('/places/' , placeRouters);
router.use('/users/' , userRouters);

module.exports = router