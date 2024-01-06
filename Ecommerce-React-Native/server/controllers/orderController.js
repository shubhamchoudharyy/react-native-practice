import orderModel from "../model/orderModel.js"
import productModel from "../model/postModel.js"
import { stripe } from "../server.js"

export const createOrderController=async(req,res)=>{
    try{

        const {shippingInfo,
            orderItems,paymentMethod,
            paymentInfo,itemPrice,
            tax,shippingCharges,
            totalAmount}=req.body

            if(!shippingInfo || !orderItems  || !itemPrice || !tax || !shippingCharges || !totalAmount){
                return res.status(404).send({
                    success:false,
                    message:'fill all fields'
                })
            }
            await orderModel.create({
                user:req.user?._id,
                shippingInfo,
            orderItems,paymentMethod,
            paymentInfo,itemPrice,
            tax,shippingCharges,
            totalAmount,
            })

            // stock update
            for(let i=0; i<orderItems.length;i++){
                const product=await productModel.findById(orderItems[i].product)
                product.stock -= orderItems[i].quantity
                await product.save()
            }

            return res.status(200).send({
                success:true,
                message:'created successfully'
            })
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in creating API',
            error
        })
    }
}

export const getMyOrdersControllers=async(req,res)=>{
    try{
        const orders=await orderModel.find({user:req.user._id})
        if(!orders){
            return res.status(200).send({
                success:false,
                message:'no orders data',
            })
        }
        return res.status(200).send({
            success:true,
            message:'orders fetched',
            totalOrders:orders.length,
            orders
        })
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in creating API',
            error
        })
    }

}

export const singleOrderDetailsController=async(req,res)=>{
    try{
        const order=await orderModel.findById(req.params.id)
        if(!order){
            return res.status(200).send({
                success:false,
                message:'no orders data',
            })
        }
        return res.status(200).send({
            success:true,
            message:'order fetched',
            order
        })

    }catch(error){
        console.log(error)
        // cast error
        if(error.name === "CastError"){
            return res.status(500).send({
                success:false,
                message:'Invalid Id'
            })
        }
        return res.status(500).send({
            success:false,
            message:'Error in get all products API',
            error
        })
    }
}


// accept payment
export const paymentController=async(req,res)=>{
    try{
        const {totalAmount}=req.body
        if(!totalAmount){
            return res.status(400).send({
                success:false,
                message:'total amount is required'
            })
        }
        const {client_secret}=await stripe.paymentIntents.create({
            amount:Number(totalAmount*100),
            currency:'usd',
        })
        return res.status(200).send({
            success:true,
            client_secret
        })
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in creating API',
            error
        })
    }
}

// ========= ADMIN SECTION =========

export const getAllOrdersController=async(req,res)=>{
    try{
        const orders=await orderModel.find({})
        return res.status(200).send({
            success:true,
            message:'All orders fetched',
            totalOrders:orders.length,
            orders
        })
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in creating API',
            error
        })
    }
}


export const changeOrderStatusController=async(req,res)=>{
    try{
        const order=await orderModel.findById(req.params.id)
        if(!order){
            return res.status(404).send({
                success:false,
                message:'order not found'
            })
        }
        if(order.orderStatus === 'processing') order.orderStatus=== 'shipped'
        else if(order.orderStatus === 'shipped'){
            order.orderStatus='delivered'
            order.deliveredAt=Date.now()
        }else{
            return res.status(500).send({
                success:false,
                message:'order already delivered'
            })
        }
        await order.save()
        return res.status(200).send({
            success:true,
            message:'order status updated'
        })
    }catch(error){
        console.log(error)
        // cast error
        if(error.name === "CastError"){
            return res.status(500).send({
                success:false,
                message:'Invalid Id'
            })
        }
        return res.status(500).send({
            success:false,
            message:'Error in get all products API',
            error
        })
    }
}