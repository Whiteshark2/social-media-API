const express=require('express')
const router=express.Router()
const userController=require('../controllers/userControllers')
const {protect}=require('../config/authMiddleware')


router.post('/register',userController.register)
router.post('/login',userController.login)
router.put('/update',protect,userController.update)
router.get('/:id',userController.getUser)
router.post('/:id/follow',protect,userController.follow)
router.post('/:id/unfollow',protect,userController.unfollow)

module.exports=router