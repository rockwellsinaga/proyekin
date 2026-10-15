const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, path.join(__dirname, "../public/uploads"));
  },
  filename(req, file, callback) {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    callback(null, uniqueName + path.extname(file.originalname).toLowerCase());
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.mimetype)) {
      return callback(new Error("File harus berupa JPG, PNG, atau WEBP"));
    }

    callback(null, true);
  },
});

function uploadImage(req, res, next) {
  upload.single("image")(req, res, (error) => {
    if (error) {
      req.uploadError = error.message;
      return next();
    }

    next();
  });
}

module.exports = uploadImage;
