const path = require('path')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },

    filename: function(req,file,cb){
        cb(null,Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage : storage,
    fileFilter : function(req,file,callback){
        if(
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/png"
        ){
            callback(null , true)
        }
        else{
            console.log("Only Jpg And Png File Accepted ")
            callback(null , false)
        }
    },
    limits : {
        fileSize : 1024 * 1024 * 2
    }
})

module.exports = upload