import userModel from "../model/userModel.js"
import { getDataUri } from "../utils/feautres.js"
import cloudinary from 'cloudinary'
export const registerController=async(req,res)=>{
    try{
        const {name,email,password,address,city,country,phone,answer}=req.body
        // validation
        if(!name || !email || !password || !city || !address || !country || !phone || !answer){
            return res.status(500).send({
                success:false,
                message:'Please provide all fields'
            })
        }
        const existingUser=await userModel.findOne({email})
        if(existingUser){
            return res.status(500).send({
                success:false,
                message:'Email already exists'
            })
        }
        const user=await userModel.create({
            name,email,address,password,city,country,phone,answer
        })
        return res.status(200).send({
            success:true,
            message:'Registered Successfully',
            user
        })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'error in register api'
        })
    }
}

export const loginController=async(req,res)=>{
    try{
        const {email,password}=req.body
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message:'Please fill all fields'
            })
        }
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'user not found'
            })
        }
        // check password
        const isMatch=await user.comparePassword(password)
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:'invalid credintials',
            })
        }

        const token=user.generateToken()

        return res.status(200).cookie('token',token,{
            expires:new Date(Date.now() + 15*24*60*60*1000),
            secure:process.env.NODE_ENV ==='development' ? true :false,
            httpOnly:process.env.NODE_ENV ==='development' ? true :false,
            sameSite:process.env.NODE_ENV ==='development' ? true :false,
        }).send({
            success:true,
            message:'Login Successfully',
            user,
            token
        })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'error in login api',
            error
        })
    }
}


export const getUserController=async(req,res)=>{
    try{
        const user=await userModel.findById(req.user._id)
        user.password=undefinded
        return res.status(200).send({
            success:true,
            message:'user profile ',
            user
        })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'error in profile api',
            error
        })
    }
}

export const logoutController=async(req,res)=>{
    try{
        return res.status(200).cookie('token',"",{
            expires:new Date(Date.now()),
            secure:process.env.NODE_ENV ==='development' ? true :false,
            httpOnly:process.env.NODE_ENV ==='development' ? true :false,
            sameSite:process.env.NODE_ENV ==='development' ? true :false,
        }).send({
            success:true,
            message:'logout successfully'
        })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'error in logout api',
            error
        })
    }
}

export const updateProfileController=async(req,res)=>{
    try{
        const user=await userModel.findById(req.user._id)
        const {name,email,address,city,country,phone}=req.body
        if(name) user.name=name
        if(email) user.email=email
        if(address) user.address=address
        if(city) user.city=city
        if(country) user.country=country
        if(phone) user.phone=phone
        await user.save()
        return res.status(200).send({
            success:true,
            message:'Updated successfully'
        })
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'error in update profile api',
            error
        })
    }
}
export const updatePasswordController=async(req,res)=>{
    try{
        const user=await userModel.findById(req.user._id)
        const {oldPassword,newPassword}=req.body
        // validation
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                success:true,
                message:'Please provide old and new password'
            })
        }
        const isMatch=await user.comparePassword(oldPassword)
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:'Invalid old password'
            })
        }
        user.password=newPassword
        await user.save()
        return res.status(200).send({
            success:true,
            message:'password updated'
        })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'error in update password api',
            error
        })
    }
}

export const updatePictureController=async(req,res)=>{
    try{
        const user=await userModel.findById(req.user._id)
        // file get from client
        const file=getDataUri(req.file)
        // delete prev image
        await cloudinary.v2.uploader.destroy(user.profilePic.public_id)
        // update 
        const cdb=await cloudinary.v2.uploader.upload(file.content)
        user.profilePic={
            public_id:cdb.public_id,
            url:cdb.secure_url
        }
        // save func
        await user.save()
        return res.status(200).send({
            success:true,
            message:'success in profile pic updation'
        })
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'error in update profile pic api',
            error
        })
    }
}

export const passwordResetController=async(req,res)=>{
    try{
        // user get email || newPassword || answer
        const {email,newPassword,answer}=req.body;
        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success:false,
                message:'Provide all fields'
            })
        }
        const user=await userModel.findOne({email,answer})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'user not found'
            })
        }
       
        user.password=newPassword
        await user.save()
        res.status(200).send({
            success:true,
            message:'your password has been updated Please Login !',
            user
        })
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'error in update profile pic api',
            error
        })
    }
}