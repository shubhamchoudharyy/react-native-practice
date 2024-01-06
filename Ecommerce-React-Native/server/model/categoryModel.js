import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({

    category:{
        type:String,
        required:[true,'category name is required']
    }
},{timestamps:true})

export const categoryModel=mongoose.model('category',categorySchema);

export default categoryModel