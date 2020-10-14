const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const user = require("../models/user");

//User Registration
exports.signup = (req, res, next) => {
  const saltRounds = 10;
  const myPlaintextPassword = req.body.password;

  user
    .findOne({ email: req.body.email }, (err, result) => {
      if (err) {
        res.status(404).json(new Error("Error"));
      }
    })
    .then((user) => {
      if (user != null) {
        res.status(409).json("Email Exist");
      } else {
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
            // Store hash in your password DB.
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              password: hash,
              email: req.body.email,
              address: req.body.address,
              mobile_no: req.body.mobile_no,
              ward: req.body.ward,
              image:
                typeof req.file !== "undefined"
                  ? req.file.path
                  : "uploads\\avatar.png",
            });

            user
              .save()
              .then((result) => {
                console.log("Saved");
                res.status(201).json({
                  id: result._id,
                  name: result.name,
                  email: result.email,
                  credit: result.credit,
                  ward: result.ward,
                  image: result.image,
                });
              })
          });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};
