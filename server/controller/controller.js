const User = require('../model/user');


const postUserData = (req, res)=>{
    try {
        const obj = {
            userName:   req.body.userName,
            userEmail:  req.body.userEmail,
            userImage:  req.files[0].originalname,
            userResume: req.files[1].originalname,
        }

        const result  = User.create({obj})
        if(result){
            res.status(202).send({success:true, msg:'user data added!', data:result});
        }else{
            res.status(404).send({success:false, msg:'cannot add user data!', data:null});
        }

        console.log(obj);

    } catch (error) {
        console.log(error);
    }
}

const getUserData=(req, res)=>{
    try {
        const [userEmail] =req.body;
        const result = User.find({userEmail:userEmail});
        if(result){
            res.status(202).send({success:true, msg:'find user data!', data:result});
        }else{
            res.status(404).send({success:false, msg:'cannot find user data!', data:null});
        }
    } catch (error) {
        
    }
}

module.exports={
    postUserData,
    getUserData,
}