const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');

const controllers = require('./controllers/image');

const app = express();

app.set('view engine','ejs');


const fileStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'images');
    },
    filename: (req,file,cb)=>{
        cb(null,  Date.now() + '-' +file.originalname);
    }
});

app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(multer({storage : fileStorage}).single('croppedImage'));

app.get('/' , controllers.getHomePage)
app.get('/upload-image' , controllers.getUploadImage)
app.post('/uploadImage' , controllers.postUploadImage)


app.use('/images' , express.static('images'));

mongoose.connect('mongodb+srv://cropper:cropper@cluster0.fjhwy.mongodb.net/cropper?retryWrites=true&w=majority') // Your MongoDb URI
.then( () => {
    app.listen(8000);
    console.log("connected!");
})
.catch( err => {
    console.log(err);
})
