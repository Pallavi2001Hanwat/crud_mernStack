const express=require("express");
const cors=require("cors");
const app=express();
app.use(cors())
app.use(express.json())
// Import the connect function
const connect = require("./database/conn");

const userModel=require("./Model/User")

// Call the connect function to establish the MongoDB connection
connect();
userModel();

const PORT= process.env.PORT||8080
//read
app.get("/", async(req,res)=>{
    const data=await userModel.find({})
    res.json({success:true,data:data})
})

//create
app.post("/create",async(req,res)=>{
   // console.log(req.body)
    const data=new userModel(req.body)
    await data.save();
    res.send({success:true,message:"save successfully",data:data})
})

//update
app.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
  
    try {
      const updatedData = await userModel.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!updatedData) {
        return res.status(404).json({ success: false, message: "Data not found" });
      }
  
      res.json({ success: true, message: "Data updated successfully", data: updatedData });
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ success: false, message: "Data update failed", error: error.message });
    }
  });
  

//delete
app.delete("/delete/:id",async(req,res)=>{
    const Id=req.params.id
    //console.log(Id)
  const data=  await userModel.deleteOne({_id:Id})
    res.send({success:true,message:"data deleted successfully",data:data})
})



app.listen(PORT,()=>
console.log("Server is Running"))