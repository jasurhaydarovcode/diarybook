const multer = require('multer');
const path = require('path');

//Creating and set storage
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

//Initialize upload function
const upload = multer({
    storage: storage,
    limits: { fileSize: 40000000 }, //5mb upload size limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
});

//Check file for image format
function checkFileType(file, cb) {
    const fileTypes = /jpeg|jpg|png|gif|svg|webp/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = fileTypes.test(file.mimetype)

    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb('Error: Images Only!')
    }
};

module.exports = upload;