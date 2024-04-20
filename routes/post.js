const express=require('express')
const router=express.Router()
const postController=require('../controllers/postControllers')
const {protect}=require('../config/authMiddleware')

router.post('/',protect,postController.create)
router.put('/:id',protect,postController.update)


module.exports=router