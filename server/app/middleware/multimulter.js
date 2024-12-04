const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({
    storage: storage
})

const multimulterMiddleware = (req, res, next) => {
    upload.array('image', 3)(req, res, (err)=> {
        if(err) throw err;
        next();
}
)};

module.exports = multimulterMiddleware;