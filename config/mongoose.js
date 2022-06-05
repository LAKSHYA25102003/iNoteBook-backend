const mongoose=require("mongoose");
require('dotenv').config();

let uri=process.env.URI;

 const connectToMongo=()=>{
         mongoose.connect(uri,(err)=>{
         if(err)
         {
             console.log("Data base is not connected");
         }
         else
         {
            console.log("connected to mongo successfully");
         }
     })
 }

 module.exports=connectToMongo;