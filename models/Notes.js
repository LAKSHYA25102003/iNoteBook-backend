const mongoose=require("mongoose");
const User=require("../models/User");

const notesSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        required:true
    },
    
    description:{
        type:String,
        require:true
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Notes=mongoose.model("Notes",notesSchema);

module.exports=Notes;