const {User}=require("../models/users")
const express =require("express");
const router= express.Router();
const bcrypt= require("bcryptjs")

//get all users
router.get("/", async (req,res)=>{
const userList= await User.find()
console.log(userList)
//checkuserlist->send error->send users
!userList ? res.status(500).json({success:false}): res.send(userList)})

//create user
router.post("/", async (req,res)=>{
   let user= new User({
    name:req.body.name,
    email:req.body.email,
    passwordHash:bcrypt.hashSync(req.body.password, 10),
   });
   user= await user.save();

   if(!user) return res.status(404).send("the user cant be created");
   
   res.send(user);
})

module.exports = router;