const multer = require('multer');

const uploadStorage = multer.diskStorage({
    
    destination:(req,file, cb)=>{
        cb(null,'public/resume');
    },
    
    filename:(req, file, cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({
    storage: uploadStorage,
})
module.exports = upload;