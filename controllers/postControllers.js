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

module.exports.delete=asyncHandler(async(req,res)=>{
    const post=await Post.findById(req.params.id)
    if(post && req.user._id.equals(post.user)){
        await post.delete()
        res.status(201).json({message:"Post deleted"})
    }else{
        res.status(400)
        throw new Error("Post not found /Not authorised ")
    }
})

module.exports.likeUnlike=asyncHandler(async(req,res)=>{
    const postId=req.params.id
    const userId=req.user._id
    const post=await Post.findById(postId)

    if(post && userId){
    const likedIndex=post.likedBy.indexOf(userId)
    if(likedIndex===-1){
        post.likes+=1
        post.likedBy.push(userId)
    }else{
        post.likes-=1
        post.likedBy.splice(likedIndex,1)
    }

    await post.save()
}else{
    res.status(404)
    throw new Error("Post not found/ Not authorised")
}
    
})