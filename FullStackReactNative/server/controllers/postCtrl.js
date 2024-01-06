const postModel = require("../models/postModel")


const createPostController=async(req,res)=>{

    try{
        const {title,description}=req.body
        // validate
        if(!title || !description){
            return res.status(400).send({
                success:false,
                message:"Please provide all details"
            })
        }
        const post=await postModel({
            title,
            description,
            postedBy:req.auth._id
        }).save()
        res.status(200).send({
            success:true,
            message:'Post created Successfully',
            post,
        })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:true,
            message:'Error in Create post Api',
            error
        })
    }
}

const getPostController=async(req,res)=>{
    try{

        const posts =await postModel.find().populate("postedBy","_id name").sort({createdAt:-1});
        return res.status(200).send({
            success:true,
            message:'All posts fetched',
            posts
        })
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:true,
            message:'Error ',
            error
        })
    }
}

const getUserController=async(req,res)=>{
    try{
        const posts=await postModel.find({postedBy:req.auth._id})
        
        return res.status(200).send({
            success:true,
            message:'user posts',
            posts
        })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:true,
            message:'Error ',
            error
        })
    }
}

const deletePostController=async(req,res)=>{
    try{
        const {id}=req.params
        await postModel.findByIdAndDelete({_id:id})
        return res.status(200).send({
            success:true,
            message:'Post deleted Successfully'
        })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:true,
            message:'Error ',
            error
        })
    }
}

const updatePostController=async(req,res)=>{
    try{
        const {title,description}=req.body
        const post=await postModel.findById({_id:req.params.id})
        if(!title || !description){
            return res.status(500).send({success:false,message:'Please provide all fields'})
        }

        const updatePost=await postModel.findByIdAndUpdate({_id:req.params.id},{
            title:title || post?.title,
            description:description || post?.description
        },{new:true})
        return res.status(200).send({success:true,message:'Post updated',updatePost})

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:true,
            message:'Error ',
            error
        })
    }
}
module.exports={createPostController,getPostController,getUserController,deletePostController,updatePostController}