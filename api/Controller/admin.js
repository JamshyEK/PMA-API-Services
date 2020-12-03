const Requests = require("../models/requests");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const varnames=require('../varnames');
const mongoose = require("mongoose");
//allRequests
exports.allRequests = (req, res, next) => {
  user_id = req.userData.id;
  Requests.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.updateRequests = (req, res, next) => {
  const req_id = req.body.req_id;
  const req_status = req.body.req_status;
  const date = new Date();
  Requests.updateOne(
    { _id: req_id },
    { $set: { requestStaus: req_status, approvedDate: date } }
  )
    .then((done) => {
      Requests.findOne({ _id: req_id })
        .populate("user", "ward")
        .then((products) => {
          console.log(products.user.ward);
          console.log(products);
          
          Requests.find({bulkRequestStaus:false,requestStaus:varnames.Approved})
            .populate({ path: "user", match: { ward: products.user.ward } })
            .then((result) => {
             // console.log(result[0].user)
              result = result.filter(user => user.user != null);
             // console.log(result.length);
              if(result.length>=varnames.bulkrequestlimit){
                Requests.updateMany( { _id: { $in:result} },
                  { $set: { bulkRequestStaus : true } },
                  {multi: true}).then(result=>res.status(200).json(result))
              }else{
                res.status(200).json("inserted")
              }
           
             // console.log(result);
            //  test=result.map(x=>x._id)
            //  console.log(test)
            //   res.json(result.length);
            });
         
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.registerKudumbashree = (req, res, next) => {
  const saltRounds = 10;
  const myPlaintextPassword = req.body.password;

  User.findOne({ email: req.body.email }, (err, result) => {
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
              role: "kudumbashree",
            });

            user.save().then((result) => {
              console.log("Saved");
              res.status(201).json({
                id: result._id,
                name: result.name,
                email: result.email,
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

exports.frontpagePosts = (req, res, next) => {
  const videoLink = req.body.videoLink;
};
