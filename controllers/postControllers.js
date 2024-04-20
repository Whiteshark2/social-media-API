const Post=require('../models/Post')
const asyncHandler=require('express-async-handler')


module.exports.create=asyncHandler(async(req,res)=>{
    const post=await Post.create(req.body)
    post.user=req.user._id;
    await post.save();
    res.status(200).json(post)
})

module.exports.update=asyncHandler(async(req,res)=>{
    const post=await Post.findById(req.params.id)
  
    if(post && post.user.equals(req.user._id)){
       await post.updateOne({$set:req.body})
       res.status(201).json({
        id:post.id,
        desc:post.desc,
        image:post.image,
        likes:post.likes
       })
    }else{
        res.status(401)
        throw new Error('You can update only own post')
    }
})