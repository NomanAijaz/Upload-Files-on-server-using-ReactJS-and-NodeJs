const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
const uploadCandidateProfileImageMiddleware = require('../middleware/upload-Image');
const uploadCandidateResumeMiddleware = require('../middleware/upload-resume');


router.post('/postUserdata', uploadCandidateProfileImageMiddleware('profileImage'), uploadCandidateResumeMiddleware('resume') ,controller.postUserData);
router.get('/postUserdata', controller.getUserData);

router.get('/', ()=>{
    console.log("Home Route is working fine");
});


module.exports=router;