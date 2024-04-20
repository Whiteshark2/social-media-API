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
    const user=await User.findById(req.user._id)
    if(user){
        user.username=req.body.username||user.username
        user.email=req.body.email||user.email
        if(req.body.password){
            user.password=bcrypt.hash(req.body.password,10)
        }
        user.profilePicture=req.body.profilePicture||user.profilePicture
        user.coverPicture=req.body.coverPicture||user.coverPicture
        user.desc=req.body.desc||user.desc
        user.city=req.body.city||user.city

        const updatedUser=await user.save()
        return res.status(200).json({
           id:updatedUser.id,
           email:updatedUser.email,
           profilePicture:updatedUser.profilePicture,
           coverPicture:updatedUser.coverPicture,
           desc:updatedUser.desc,
           city:updatedUser.city
        })
    }else{
        res.status(401)
        throw new Error ("Not Authorised")
    }
})

module.exports.getUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id).select('-password')
    res.status(200).json({user})
})

module.exports.follow=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id)
    if(user){
        if(!user.followers.includes(req.user._id)){
            await user.followers.push(req.user._id)
            await user.save()
        }
        const curr=await User.findById(req.user._id)
       
        if(!(curr.following.includes(req.params.id))){
            curr.following.push(req.params.id)
            await curr.save()
        }
        res.status(200).json({
            message:"Successfully followed"
        })
    }else{
        res.status(404)
        throw new Error("Not authorised")
    }
})

module.exports.unfollow=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id)
    if(user){
        if(user.followers.includes(req.user._id)){
            user.followers.pull(req.user._id)
            await user.save()
        }
        const curr=await User.findById(req.user._id)
        if(curr.following.includes(req.params.id)){
            curr.following.pull(req.params.id)
            await user.save()
        }
        res.status(200).json({
            message:"successfully unfollowed",
            user,curr
        })
    }
})