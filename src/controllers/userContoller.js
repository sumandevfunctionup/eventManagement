const userModel = require("../models/userModel")
const jwt=require('jsonwebtoken');
const { update } = require("../models/eventModel");

const registerUser=async function(req,res){
try{
    let userData=req.body
    let createUser=await userModel.create(userData)
    return res.status(201).send({status:true,msg:"created succesfully",userData:createUser})

}
catch(err){
    return res.status(500).send({status:false,msg:err})

}}


const login=async function(req,res){
    try{

    let email=req.body.email;
    let password=req.body.password;
   

    let user=await userModel.findOne({email:email,password:password});
    if(!user) return res.status(400).send({status:false,msg:"invalid email or password,please enter a valid email or password"})
   


    let token = jwt.sign({ userId: user._id.toString() }, "secuiretyKeyToCheckToken");
    res.setHeader("x-api-key", token);
    res.status(200).send({ status: "user log-in successfully", data: token });
}
catch(err){
return res.status(500).send({ERROR:err})
}
}

const updatePassword=async function(req,res){
    try{
         let password=req.body.password;
         let newPassword=await userModel.findOneAndUpdate({_id:userId},
            {$set:{ password:password,isPublished:true,publishedAt:new Date()},
            $addToSet:{password:password}},{new:true})
              res.status(200).send({status:true,data:newPassword})
    }

    catch(err){
        return res.statsu(500).send({status:false,Error:err})
    }
}
module.exports.registerUser=registerUser;
module.exports.login=login;
module.exports.updatePassword=updatePassword;