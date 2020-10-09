const express = require('express');
const app=express();
const port =5000;

app.get('/',(req,res)=>{
    res.send("It is working");
})

app.listen(port,()=>{
    console.log("node server is running");
})