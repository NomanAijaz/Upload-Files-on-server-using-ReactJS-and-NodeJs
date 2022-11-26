const express = require('express');
const app = express();
const Router = require('./routes/route');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConnection = require('./Database/connection');
const dotenv = require('dotenv');
const path = require('path');
var morgan = require('morgan');



app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({limit:'50mb', extended:true}));
app.use(morgan('dev'));
dotenv.config({path:'config.env'});

app.use(express.static(path.join(__dirname,'public')));
app.use(express.static('public/images')); //http://localhost:3001/images/noman@gmail.com-IMG_20221025_095823.png
app.use(express.static('public/resume')); //http://localhost:3001/resume/noman@gmail.com-AndroidResume.pdf

 dbConnection();

app.use(cors({
    origin:'*',
    credentials:true,
}));



app.use('/admin',Router)


const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log("Server is running on port: ",PORT);
});
