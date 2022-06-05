const mongoose=require("mongoose");

const uri="mongodb+srv://lakshya:4JtflDhJG2vO6ZVt@cluster0.hmd3q.mongodb.net/inotebook?retryWrites=true&w=majority";

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