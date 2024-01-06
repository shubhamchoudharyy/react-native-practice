import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    shippingInfo:{
        address:{
            type:String,
            required:[true,'address is required']
        },
        city:{
            type:String,
            required:[true,'city name is required']
        },
        country:{
            type:String,
            required:[true,'city name is required']
        }
    },
    orderItems:[{
        name:{
            type:String,
            required:[true,'product name is required']
        },
        price:{
            type:Number,
            required:[true,'product price is required']
        },
        stock:{
            type:Number,
            required:[true,'product stock is required']
        },
        quantity:{
            type:Number,
            required:[true,'product quantity is required']
        },
        image:{
            type:String,
            required:[true,'product image is required']
        },
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'products',
            required:true
        }
    }],
    paymentMethod:{
        type:String,
        enum:["COD","Online"],
        default:"COD"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:[true,'user id is required']
    },
    paidAt:{
        type:Date,
    },
    paymentInfo:{
        id:String,
        status:String,
    },
    itemPrice:{
        type:Number,
        required:[true,'item price is required']
    },
    tax:{
        type:Number,
        required:[true,'item price is required']
    },
    shippingCharges:{
        type:Number,
        required:[true,'item price is required']
    },
    totalAmount:{
        type:Number,
        required:[true,'item price is required']
    },
    orderStatus:{
        type:String,
        enum:['processing','shipped','delivered'],
        default:'processing'
    },
    deliveredAt:{
        type:Date
    }
    
},{timestamps:true})

export const orderModel=mongoose.model('orders',orderSchema)
export default orderModel