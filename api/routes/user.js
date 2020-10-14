const express = require("express");
const router = express.Router();
const userController = require("../Controller/user");
const multer = require("multer");
const authCheck = require('../middleware/check-auth');
const user = require("../models/user");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg"
  ) {
    console.log("image");
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
  // You can always pass an error if something goes wrong:
//cb(new Error('I don\'t have a clue!'))
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter
});

router.post("/signup",upload.single("profileImage"), userController.signup);

router.post("/signin",userController.signin);

module.exports = router;
