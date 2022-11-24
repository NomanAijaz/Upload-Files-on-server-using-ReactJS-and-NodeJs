const mongoose = require('mongoose');

const dbConnection = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });

        console.log("MongoDB Connected! with host ",conn.connection.host);

    } catch (error) {
        console.log("Got an error ",error);
        process.exit(1);   
    }
}

module.exports = dbConnection;