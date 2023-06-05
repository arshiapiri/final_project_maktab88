const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/userAvatars");
  },
  filename: function (req, file, cb) {
    if (file.originalname === "male.png")
      cb(new Error("Bad file name!"), null);
    cb(null, Date.now() + "-" + file.originalname);
  },
  });
  
  module.exports.upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        return cb(new Error("Only .png, .jpg and .jpeg format allowed!"), false);
      }
    },
    limits: {
      files: 10,
      fileSize: 1 * 1024 * 1024,
    },
  });

  // thumbnailImages
  const thumbnailStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images/articles/thumbnailPic");
    },
    filename: function (req, file, cb) {
      if (file.originalname === "male.png")
        cb(new Error("Bad file name!"), null);
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  
  
    module.exports.articleTumbnailUpload = multer({
      storage: thumbnailStorage,
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype == "image/png" ||
          file.mimetype == "image/jpg" ||
          file.mimetype == "image/jpeg"
        ) {
          cb(null, true);
        } else {
          return cb(new Error("Only .png, .jpg and .jpeg format allowed!"), false);
        }
      },
      limits: {
        files: 10,
        fileSize: 1 * 1024 * 1024,
      },
    });

