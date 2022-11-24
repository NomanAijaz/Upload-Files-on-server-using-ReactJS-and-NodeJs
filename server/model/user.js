const mongoose  = require('mongoose');

const schema = mongoose.Schema({
    userName:String,
    userEmail:{
        type:String,
        require: true
    },
    userImage:String,
    userResume:{
        type:String,
        require: true
    }
});

const user = mongoose.model('user', schema);

module.exports = user;