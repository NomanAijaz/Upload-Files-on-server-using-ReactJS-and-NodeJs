const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

router.post('/postUserdata', controller.postUserData);
router.get('/postUserdata', controller.getUserData);

router.get('/', ()=>{
    console.log("Home Route is working fine");
});


module.exports=router;