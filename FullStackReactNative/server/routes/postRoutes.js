const express=require('express')
const { requireSignIn } = require('../controllers/userCtrl')
const { createPostController, getPostController, getUserController, deletePostController, updatePostController } = require('../controllers/postCtrl')

const router=express.Router()

router.post('/create-post',requireSignIn,createPostController)

router.get('/get-all-posts',getPostController)
router.get('/get-user-posts',requireSignIn,getUserController)

router.delete('/delete-post/:id',requireSignIn,deletePostController)

router.put('/update-post/:id',requireSignIn,updatePostController)
module.exports=router