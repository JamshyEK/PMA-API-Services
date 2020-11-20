const Requests = require("../models/requests");
const User = require("../models/user");
const bcrypt = require("bcrypt");
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
  const date =new Date();
  Requests.updateOne({ _id: req_id },{ $set: { requestStaus: req_status, approvedDate:date} })
    .then((done) => {
      Requests.findOne({ _id: req_id })
        .populate("user", "ward")
        .then((products) => {
          console.log(products.user.ward);
          console.log(products);
          Requests.find({})
            .populate({ path: "user",match: { ward: products.user.ward }  })
            .then(async(prod) => {
              
              //console.log(prod)
            let fprd=await prod.filter(x=>{
                console.log(x.user!==null);
                x.user==null
              }).length;
            console.log(fprd);



              // if (prod >= 4) {
              //   // Requests.updateMany({ bulkRequestStaus: false },{bulkRequestStaus:true})
              //   //   .populate({
              //   //     path: "user",
              //   //     match: { ward: products.user.ward },
              //   //   })
              //   //   .then((p) => console.log(p));
              //   // console.log("aaaaaaaa");
              // }
            });
        });
    })
    .catch((err) => {
      console.log(err);
    });
  // Requests.updateOne(
  //   { _id: req_id },
  //   {
  //     requestStaus: req_status,
  //   }
  // )
  //   .then((result) => {
  //     //     console.log(result);
  //     //     //Requests.updateOne()
  //     //     res.json(result);
  //     // }

  //     const test = new Promise(async(resolve, reject) => {

  //        let test= await Requests.aggregate([
  //           {
  //             $lookup: {
  //               from: "User",
  //               localField: "user",
  //               foreignField: "_id",
  //               as: "wardrequest",
  //             },
  //           },
  //           { $unwind: "$request" },
  //         ])
  //       resolve(test);
  //       reject(console.log("err"));
  //     });

  //     test.then((result) => {
  //         console.log(result);
  //       })
  //       .catch();
  //     // const wardrequest=async ()=>{await Requests.aggregate([
  //     //       { $lookup:{
  //     //           from: User,
  //     //                localField: "user",
  //     //                foreignField: "_id",
  //     //                as: "wardrequest"
  //     //         }
  //     //         },
  //     //         { "$unwind": "$request" }
  //     //   ]);
  //     // }

  //     // wardrequest();
  //     //   console.log();
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
  console.log(req_id, req_status);
};


exports.registerKudumbashree=(req,res,next)=>{
  const saltRounds = 10;
  const myPlaintextPassword = req.body.password;

  User
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
              address:req.body.address,
              role:"kudumbashree"
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

}


exports.frontpagePosts=(req,res,next)=>{
const videoLink = req.body.videoLink;

}