const mongoose=require("mongoose")
const UserSchema=mongoose.Schema({
    name:String,
    email:String,
    mobile:Number,

},({timestamps:true}))

const userModel= new mongoose.model("User",UserSchema);

module.exports=userModel

