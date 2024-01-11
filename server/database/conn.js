const mongoose=require("mongoose");

  async function connect(){
    try{
        await  mongoose.connect("mongodb://127.0.0.1:27017/crudOperation")
        console.log("database connect")

    }catch(error){
        console.log("Database not connected")
    }
 }
 

 module.exports = connect;