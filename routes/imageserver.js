module.exports = function(app){

const multer = require('multer');
var fileExtension = require('file-extension');
    // Configure Storage
var storage = multer.diskStorage({

    // Setting directory on disk to save uploaded files
    destination: function (req, file, cb) {
        cb(null, 'uploaded_images')
    },

    // Setting name of file saved
    filename: function (req, file, cb) {
        console.log('file');
        console.dir(file);
        const today = new Date();
        const day = today.getDate();        
        const month = today.getMonth()+1;     
        const year = today.getFullYear();   
        cb(null, file.originalname.substring(0,file.originalname.indexOf('.')) + '-' + year + month + day + '.' + fileExtension(file.originalname));
    }
});

var upload = multer({
    storage: storage,
    limits: {
        // Setting Image Size Limit to 2MBs
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            //Error 
            cb(new Error('Please upload JPG and PNG images only!'))
        }
        //Success 
        cb(undefined, true)
    }
})

app.post('/uploadfile', upload.single('uploadedImage'), (req, res, next) => {
    const file = req.file;
    console.log('file i upload:');
    console.log(file);
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.status(200).send({
        statusCode: 200,
        status: 'success',
        uploadedFile: file
    })

}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    })
})


           
    }