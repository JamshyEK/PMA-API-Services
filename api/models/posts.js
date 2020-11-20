const mongoose = require("mongoose");

const postsSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    videoLink:{ type: String }

});

module.exports=mongoose.model("posts",postsSchema);