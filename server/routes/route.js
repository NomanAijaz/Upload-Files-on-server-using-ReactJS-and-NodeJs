const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
const uploadCandidateProfileImageMiddleware = require('../middleware/upload-Image');

//const uploadCandidateResumeMiddleware = require('../middleware/upload-resume');



//, uploadCandidateProfileImageMiddleware.single('profileImage'), uploadCandidateResumeMiddleware.single('resume')
router.post('/postUserdata', uploadCandidateProfileImageMiddleware.any('profileImage'), controller.postUserData);
router.get('/postUserdata', controller.getUserData);

router.get('/', ()=>{
    console.log("Home Route is working fine");
});


module.exports=router;