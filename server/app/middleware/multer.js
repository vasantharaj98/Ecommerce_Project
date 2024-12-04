const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({
    storage: storage
})

const multerMiddleware = (req, res, next) => {
    upload.single('image')(req, res, (err)=> {
        if(err) throw err;
        next();
}
)};

module.exports = multerMiddleware;