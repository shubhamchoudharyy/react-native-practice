import mongoose from "mongoose";

// review model
const reviewSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    rating:{
        type:Number,
        default:0,
    },
    comment:{
        type:String,

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:[true,'user is required']
    }
},{timestamps:true})

// product model
const productSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,'product name is required']
    },
    description:{
        type:String,
        required:[true,'product description is required']
    },
    price:{
        type:Number,
        required:[true,'price is requried']
    },
    stocks:{
        type:Number,
        required:[true,'product stocks required']
    },
   
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    images:[{
        public_id:{
            type:String
        },
        url:{
            type:String
        }
    }],
    reviews:[reviewSchema],
    rating:{
        type:Number,
        default:0,
    },
    numReviews:{
        type:Number,
        default:0
    },

},{timestamps:true})

export const productModel=mongoose.model('products',productSchema);

export default productModel