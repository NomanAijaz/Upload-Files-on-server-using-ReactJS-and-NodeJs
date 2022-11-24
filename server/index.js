const express = require('express');
const app = express();
const Router = require('./routes/route');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConnection = require('./Database/connection');
const dotenv = require('dotenv');

const fileUpload = require('file-upload');

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({limit:'50mb', extended:true}));

dotenv.config({path:'config.env'});

dbConnection();

app.use(cors({
    origin:'*',
    credentials:true,
}));



app.use('/admin',Router)

app.use(()=>{
    console.log("Page not found Error");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log("Server is running on port: ",PORT);
});
