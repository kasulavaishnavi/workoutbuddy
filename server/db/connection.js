const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/Project1")
.then(()=>{
    console.log("connection established");
})
.catch((err)=>{
    console.log(`error is ${err}`)
})