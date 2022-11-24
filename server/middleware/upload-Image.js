const multer = require('multer');
let image, resume;
const uploadStorage = multer.diskStorage({
    destination:(req,file, cb)=>{
        
        if(file.fieldname === 'profileImage')
            cb(null,'public/images');
        else if(file.fieldname === 'resume')
            cb(null,'public/resume');

    },
    filename:(req, file, cb)=>{
        
        cb(null, `${req.body.userEmail}-${file.originalname}`);
        
    }
})

const upload = multer({
    storage: uploadStorage,
})
module.exports = upload;