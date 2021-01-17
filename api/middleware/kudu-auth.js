module.exports=(req,res,next)=>{
    //console.log(req.userData);
   
    if(req.userData.role==="kudumbashree"){
       
        next();
    }
    else{
        res.status(401).json({message:"Kudumbashree Failed"});
    }

}