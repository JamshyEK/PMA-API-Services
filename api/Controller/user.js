const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");
const Requests = require("../models/requests");
const user = require("../models/user");
<<<<<<< HEAD
const Requests = require("../models/requests");
const fs = require("fs");
//const { use } = require("../routes/user");
=======
>>>>>>> UserRequests

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

            user.save().then((result) => {
              console.log("Saved");
              res.status(201).json({
                id: result._id,
                name: result.name,
                email: result.email,
                credit: result.credit,
                ward: result.ward,
                image: result.image,
              });
            });
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
      console.log(user);
      if (user == null) {
        //console.log("Auth Failed");
        res.status(401).json({ message: "Auth Failed" });
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
                  //
                  ward: user.ward,
                },
                process.env.SECRET_KEY,
                { expiresIn: "24h" }
              );
              res.status(200).json({ access_token: token });
            } catch (e) {
              throw Error("Error while Login");
            }
          } else {
            res.status(401).json({ message: "Auth Failed" });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
exports.request = (req, res, next) => {
  user_id = req.userData.id;
  console.log(user_id);
=======
//Requests post
exports.request = (req, res, next) => {
  user_id = req.userData.id;
  console.log(user_id);
  var currentDate = new Date();
>>>>>>> UserRequests
  const request = new Requests({
    _id: new mongoose.Types.ObjectId(),
    user: user_id,
    requestType: req.body.requestType,
<<<<<<< HEAD
    requestStaus: "Pending",
    bulkRequestStaus: "No",
=======
    requestedDate: currentDate.toISOString(),
    requestStaus: "Pending",
    bulkRequestStaus: "No",
    quantity: req.body.quantity,
    image: typeof req.file !== "undefined" ? req.file.path : "",
>>>>>>> UserRequests
  });
  request
    .save()
    .then((result) => {
      console.log("Request Saved");
      res.json({
        Request_id: result._id,
        User_id: result.user,
      });
    })
    .catch((err) => {
<<<<<<< HEAD
      console.log("error");
    });
};

//profile
exports.profile = (req, res, next) => {
  user_id = req.userData.id;
  User.findOne({ _id: user_id })
    .then((result) => {
      console.log(result);
      res.json({
        id: result._id,
        name: result.name,
        email: result.email,
        address: result.address,
        mobile: result.mobile_no,
        ward: result.ward,
        credit: result.credit,
        image: result.image,
      });
=======
      console.log(err);
      res.status(500).json(err);
    });
};

//all requests get by a user
exports.requestall = (req, res, next) => {
  user_id = req.userData.id;
  Requests.find({ user: user_id })
    .then((result) => {
      res.status(200).json(result);
>>>>>>> UserRequests
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

<<<<<<< HEAD
//update profile
exports.update_profile = (req, res, next) => {
  user_id = req.userData.id;

  let name = req.body.name.trim();
  let address = req.body.address.trim();
  let mobile_no = req.body.mobile_no.trim();
  let ward = req.body.ward.trim();

  User.findOne({ _id: user_id })
    .then((result) => {
      let preImage = result.image.split("\\")[1];

       //console.log(typeof req.file !== "undefined")

      let image =
        typeof req.file !== "undefined" ? req.file.path :result.image;

      User.updateOne(
        { _id: user_id },
        {
          name: name,
          address: address,
          mobile_no: mobile_no,
          ward: ward,
          image: image,
        }
      )
        .exec()
        .then((result) => {
    

          if(typeof req.file !== "undefined"){
            if(preImage != "avatar.png"){
              const pathToFile = "uploads/" + preImage;
              try {
                fs.unlinkSync(pathToFile);
                console.log("Successfully deleted the file.");
              } catch (err) {
                throw err;
              }
            }
         
           }
 

          res.json({ result: result, msg: "Profile Updated" });
        });
>>>>>>> UserProfile
=======
//Delete Request
exports.requestDelete = (req, res, next) => {
  user_id = req.userData.id;
  request_id = req.params.id;
  Requests.deleteOne({ _id: request_id })
    .then((result) => {
      res.status(200).json(result);
>>>>>>> UserRequests
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};
