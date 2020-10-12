const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");

//User Registration
exports.signup = (req, res, next) => {

  const saltRounds = 10;
  const myPlaintextPassword = req.body.pass;
  const image=req.file.path
  console.log(image)

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
        image:image
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
            image:result.image
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    });
  });
};
