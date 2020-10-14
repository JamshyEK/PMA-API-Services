const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();
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

//UserLogin
exports.signin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }, (err, result) => {
    if (err) {
      console.log(err);
      res.status(404).json(new Error("Failed"));
    }
    //  else {
    //   console.log(result);
    // }
  })
    .then((user) => {
      if (user == null) {
        //console.log("Auth Failed");
        res.status(401).json("Auth Failed");
      } else {
        bcrypt.compare(password, user.password).then(function (result) {
          // result == true
          if (result) {
            //Token generation
            try {
              const token = jwt.sign(
                {
                  id: user._id,
                  name: user.name,
                },
                process.env.SECRET_KEY,
                { expiresIn: "24h" }
              );
              res.status(200).json({ access_token: token });
            } catch (e) {
              throw Error("Error while Login");
            }
          } else {
            res.status(401).json("Auth Failed");
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};
