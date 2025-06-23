const uploadToCloudinary = require("../../helpers/uploadToCloudinary")

module.exports.upload = (req, res, next) => {
    if (req.file) {
        const result = uploadToCloudinary(req.file.buffer);      
        req.body[req.file.fieldname] = result;
    } 
     next();
}


