import productModel from "../model/postModel.js"
import cloudinary from 'cloudinary'
import { getDataUri } from "../utils/feautres.js"

export const getAllProductsController=async(req,res)=>{
    const {keyword,category}=req.query
    try{
        const products=await productModel.find({
            name:{
                $regex: keyword ? keyword : '',
                $options:'i',
            },
            // category:category ? category :undefined
        }).populate('category')
        return res.status(200).send({
            success:true,
            message:'All products fetched',
            totalProducts:products.length,
            products
        })
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in get all products API'
        })
    }
}

export const topProductController=async(req,res)=>{
    try{
        const products=await productModel.find({}).sort({rating:-1}).limit(3)
        return res.status(200).send({
            success:true,
            message:'top 3 products',
            products
        })
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in get all products API'
        })
    }
}

export const getProductController=async(req,res)=>{
    try{

        const product=await productModel.findById(req.params.id)
        if(!product){
            return res.status(404).send({
                success:true,
                message:'product not found'
            })
        }
        return res.status(200).send({
            success:true,
            message:'product fetched',
            product
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
export const createProductController=async(req,res)=>{
    try{
        const {name,description,price,category,stocks}=req.body
        // if(!name || !description || !price || !stock){
        //     return res.status(500).send({
        //         success:false,
        //         message:'Fill all field'
        //     })
        // }
       
        const file=getDataUri(req.file)
        const cdb=await cloudinary.v2.uploader.upload(file.content)
        const image={
            public_id:cdb.public_id,
            url:cdb.secure_url,
        }
        if(!req.file){
            return res.status(500).send({
                success:false,
                message:'please provide product images'
            })
        }
        await productModel.create({
            name,description,price,category,stocks,images:[image]
        })

        return res.status(200).send({
            success:true,
            message:'product added',

        })
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in get all products API'
        })
    }
}

export const updateProductController=async(req,res)=>{
    try{
        const product=await productModel.findById(req.params.id)
        if(!product){
            return res.status(404).send({
                success:false,
                message:'Product not found'
            })
        }
        const {name,description,price,stocks,category}=req.body
        if(name) product.name=name
        if(description) product.description=description
        if(price) product.price=price
        if(stocks) product.stocks=stocks
        if(category) product.category=category

        await product.save()
        return res.status(200).send({
            success:true,
            message:'Updated',
            product
        })
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in get all products API'
        })
    }
}

export const updateProductImgController=async(req,res)=>{
    try{
        const product=await productModel.findById(req.params.id)
        if(!product){
            return res.status(404).send({
                success:false,
                message:'Product not found'
            })
        }
//       check file
        if(!req.file){
            return res.status(404).send({
                success:false,
                message:'file not found'
            })
        }

        const file=getDataUri(req.file)
        const cdb=await cloudinary.v2.uploader.upload(file.content)
        const image={
            public_id:cdb.public_id,
            url:cdb.secure_url
        }
        // save
        product.images.push(image)
        await product.save()
        return res.status(200).send({
            success:true,
            message:'image uploaded',
            product
        })
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in get all products API'
        })
    }
}

export const deleteProductImgController=async(req,res)=>{
    try{
        const product=await productModel.findById(req.params.id)
        if(!product){
            return res.status(404).send({
                success:false,
                message:'Product not found'
            })
        }
        // image id find
        const id=req.query.id
        if(!id){
            return res.status(404).send({
                success:false,
                message:'Not found'
            })
        }

        let isExist=-1;
        product.images.forEach((item,index)=>{
            if(item._id.toString()=== id.toString()) isExist=index
        })
        if(isExist < 0){
            return res.status(404).send({
                success:false,
                message:'Image Not found'
            }) 
        }
        // delete image
        await cloudinary.v2.uploader.destroy(product.images[isExist].public_id)
        product.images.splice(isExist,1)
        await product.save()
        return res.status(200).send({
            success:true,
            message:'Image deleted',

        })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in get all products API',
            error
        })
    }
}

// delete product

export const deleteProductController=async(req,res)=>{
    try{
        const product=await productModel.findById(req.params.id)
        if(!product){
            return res.status(404).send({
                success:false,
                message:'Product not found'
            })
        }

        // find and delete img from cloudinary
        for(let index=0; index<product.images.length; index++){
            await cloudinary.v2.uploader.destroy(product.images[index].public_id)
        }
        await product.deleteOne()
        return res.status(200).send({
            success:true,
            message:'product deleted'
        })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in get all products API',
            error
        })
    }
}

export const reviewProductController=async(req,res)=>{
    try{
        const {comment,rating}=req.body

        const product=await productModel.findById(req.params.id)
        // check prev review
        const alreadyReviewed=product.reviews.find((r)=>r.user.toString()===req.user._id.toString())
        if(alreadyReviewed){
            return res.status(400).send({
                success:false,
                message:'Product already reviewed'
            })
        }

        const review={
            name:req.user.name,
            rating:Number(rating),
            comment,
            user:req.user._id
        }
        product.reviews.push(review)
        product.numReviews=product.reviews.length

        product.rating=product.reviews.reduce((acc,item)=> item.rating + acc,0)/product.reviews.length
        // save 
        await product.save()
        return res.status(200).send({
            success:true,
            message:'reviewed successfully'
        })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in get all products API',
            error
        })
    }
}