const Requests = require("../models/requests");

exports.allRequests=(req,res,next)=>{
    Requests.find({requestStaus:"Approved",bulkRequestStaus:true})
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
  Requests.updateOne({ _id: req_id }, { $set: { requestStaus: 'Collected', collectedDate:date} })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });


}