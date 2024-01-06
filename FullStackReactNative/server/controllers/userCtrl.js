const JWT=require('jsonwebtoken')
const { compare } = require("bcrypt");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
var {expressjwt:jwt}=require('express-jwt')

// middleware
const requireSignIn=jwt({
    secret:process.env.JWT_SECRET,
    algorithms:["HS256"]
})
const registerController=async(req,res)=>{
    try{
        const {name,email,password}=req.body
        // validation
        if(!name){
            return res.status(400).send({
                success:false,
                message:'name is required'
            })
        }
        if(!email){
            return res.status(400).send({
                success:false,
                message:'email is required'
            })
        }
        if(!password){
            return res.status(400).send({
                success:false,
                message:'password is required'
            })
        }

        // existing user
        const existingUser=await userModel.findOne({email:email})
        if(existingUser){
            return res.status(500).send({
                success:false,
                message:'user already registered'
            })
        }
        // hashed Password
        const hashedPassword=await hashPassword(password)
        // save user
        const user=await userModel({name,email,password:hashedPassword}).save();

        return res.status(200).send({
            success:true,
            message:'Registration Successfull please login'
    })
    }catch(error){
        return res.status(500).send({
            success:false,
            message:'Error in Register API',error
        })
    }
};

const loginController=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message:'Enter all details ',
            })
        }
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(500).send({
                success:false,
                message:'User not found ',
            })
        }
        // match password
        const match=await comparePassword(password,user.password)
        if(!match){
            return res.status(500).send({
                success:false,
                message:'Invalid Username or Password '
            })
        }
        // token jwt
        const token=await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:'7d'
        })
        // undefined password
        user.password=undefined;
        return res.status(200).send({
            success:true,
            message:'login Successfully',
            token,
            user,
        })

    }catch(error){
        return res.status(500).send({
            success:false,
            message:'Error ',error
        })
    }
}

const updateUserController=async(req,res)=>{
    try{
        const {name,password,email}=req.body;
        // password validation
        const user=await userModel.findOne({email})
        if(password && password.length <6){
            return res.status(400).send({
                success:false,
                message:'Password is required '
            })
        }
        const hashedPsswd=password ? await hashPassword(password) : undefined
        // updated user
        const updatedUser=await userModel.findOneAndUpdate({email},{
            name:name || user.name,
            password:hashedPsswd || user.password
        },{new:true});
        return res.status(200).send({
            success:true,
            message:'Profile updated Successfully',
            updatedUser
            
        })

    }catch(error){
        return res.status(500).send({
            success:false,
            message:'Error in updating ',error
        })
    }
}
module.exports={registerController,loginController,updateUserController,requireSignIn}