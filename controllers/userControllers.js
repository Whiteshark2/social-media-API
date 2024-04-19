const bcrypt=require('bcryptjs')
const User=require('../models/User')
const asyncHandler=require('express-async-handler')
const {generateToken}=require('../config/generateToken')

module.exports.register=asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body
    const userExist=await User.findOne({email})
    if(userExist){
        res.status(404)
        throw new Error("User already exists")
    }
    const user =await User.create({
        username:username,
        email:email,
        password: await bcrypt.hash(password, 10),
    })
    if(user){
        res.status(201).json({
            id:user.id,
            username:user.username,
            email:user.email,
            password:user.password
        })
    }else{
        res.status(400)
        throw new Error("Invalid user data")
    }
})

module.exports.login=asyncHandler(async(req,res)=>{
    const user=await User.findOne({email:req.body.email})
    if(user && await bcrypt.compare(req.body.password,user.password)){
        return res.json({
        id: user._id,
        username: user.username,
        email: user.email,
        token:generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid Email/Password')
    }
})

module.exports.update=asyncHandler(async(req,res)=>{
    
})