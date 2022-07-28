const mongoose=require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const eventSchema= new mongoose.Schema({
    userId:{
        type:ObjectId,
        ref:"user",
        required:"please enter a valid userId"

    },
    name:{
        type:String,
        required:true
    },
    place:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
},{timestamps:true});
module.exports=mongoose.model('event',eventSchema);