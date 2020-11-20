
module.exports=(req,res,next)=>{
    //console.log(req.userData);

    if(req.userData.role==="admin"){
        next();
    }
    else{
        res.status(401).json({message:"Admin Failed"});
    }

}