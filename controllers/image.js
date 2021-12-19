const Image = require('../model/image');

exports.getHomePage = (req,res) => {
    Image.find().then( images => {
        console.log(images);
        res.render('home' , {images});
    })
    .catch( err => {
        console.log(err);
    })
}


exports.getUploadImage = (req,res) => {
    res.render('upload-image');
}

exports.postUploadImage = (req,res) => {
 
    const image = req.file;
    console.log(req.body , req.file);
    if(!image){
        console.log("Image is not there");
        return;
    }
    const imageModel = new Image({
        imageUrl : image.path
    })
    imageModel.save()
    .then( result => {
        let path = `http://localhost:8000/${image.path}`;
        console.log(req.file.location);
        res.status(200).json({ data: path });
    })
    .catch( err => {
        console.log(err);
        res.json({"error" : "Somthing wrong"})
    });
}