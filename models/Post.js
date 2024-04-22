const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    desc:{
        type:String,
        max:500
    },
    image:{
        type:String
    },
    likes:{
        type:Number,
        default:0
    },
    likedBy: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
},{timestamps:true})

module.exports=mongoose.model('Post',postSchema)