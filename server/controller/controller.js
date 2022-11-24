const User = require('../model/user');


const postUserData = async (req, res)=>{
    try {
        const obj = {
            userName:   req.body.userName,
            userEmail:  req.body.userEmail,
            userImage:  `${req.body.userEmail}-${req.files[0].originalname}`,
            userResume: `${req.body.userEmail}-${req.files[1].originalname}`,
        }

        const result  = await User.create({...obj})
        if(result){
            res.status(202).send({success:true, msg:'user data added!', data:result});
        }else{
            res.status(404).send({success:false, msg:'cannot add user data!', data:null});
        }
        

    } catch (error) {
        console.log(error);
    }
}

const getUserData= async (req, res)=>{
    try {
        const [userEmail] =req.body;
        const result = await User.findOne({userEmail:userEmail});
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