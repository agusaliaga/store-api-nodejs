const multer = require('multer');
const shortid = require('shortid');

const multerConfig = {
  storage: fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname+'../../uploads/');
    },
    filename: (req, file, cb) => {
      // file extension
      const extension = file.mimetype.split('/')[1];
      // generate file id
      cb(null, `${shortid.generate()}.${extension}`);
    }
  }),
  fileFilter(req, file, cb) {
    if ( file.mimetype === 'image/jpeg' ||  file.mimetype ==='image/png' ) { // only accept file extensions
      cb(null, true);
    } else {
      cb(new Error('Invalid Format'))
    }
  },
}

module.exports = multerConfig;