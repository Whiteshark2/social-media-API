const multer=require('multer')
const path = require('path');



function configureMulter(storagePath,name) {
    
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname,'..', storagePath));
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now());
        }
    });

    
    return multer({ storage: storage }).single(name);
}


module.exports = configureMulter;
