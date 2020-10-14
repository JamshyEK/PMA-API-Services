const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports=(req,res,next)=>{
    try{
        token=req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userData=decoded;
        // console.log(decoded);
        // console.log(req.userData.name);
        // if(req.userData.name=="jamshy122"){
        next();
        // }else{
        //     res.status(401).json({message:"Admin Failed"});
        // }
    }catch(e){
        res.status(401).json({message:"Auth Failed"})
    }
    

}