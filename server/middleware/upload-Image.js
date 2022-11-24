const multer = require('multer');
let image, resume;
const uploadStorage = multer.diskStorage({
    destination:(req,file, cb)=>{
        console.log("In image middleware ", file);
        
        if(file.fieldname === 'profileImage')
            cb(null,'public/images');
        else if(file.fieldname === 'resume')
            cb(null,'public/resume');

    },
    filename:(req, file, cb)=>{
        console.log("In image filename ", file);
        cb(null, `${req.body.userEmail}-${file.originalname}`);
        
    }
})

const upload = multer({
    storage: uploadStorage,
})
module.exports = upload;