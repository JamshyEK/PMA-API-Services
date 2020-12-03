const Requests = require("../models/requests");
const varnames=require('../varnames');

exports.allRequests=(req,res,next)=>{
    Requests.find({requestStaus:varnames.Approved,bulkRequestStaus:true})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });


}


exports.updateRequest=(req,res,next)=>{
  const req_id=req.params.id;
  const date=new Date();
  Requests.updateOne({ _id: req_id }, { $set: { requestStaus: varnames.Collected, collectedDate:date} })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });


}