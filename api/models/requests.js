const mongoose = require("mongoose");

const requestsSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    requestType:{ type: String , required: true},
    requestStaus:{ type: String , required: true},
    image: { type: String },
    bulkRequestStaus: { type: Boolean, default: false ,required: true},
    quantity:{ type: String },
    requestedDate:{type:Date},
    approvedDate:{type:Date},
    collectedDate:{type:Date}

});

module.exports=mongoose.model("requests",requestsSchema);