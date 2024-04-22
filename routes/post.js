const express=require('express')
const router=express.Router()
const postController=require('../controllers/postControllers')
const {protect}=require('../config/authMiddleware')

router.post('/',protect,postController.create)
router.put('/:id',protect,postController.update)
router.delete('/:id',protect,postController.delete)
router.post('/:id/like',protect,postController.likeUnlike)

module.exports=router