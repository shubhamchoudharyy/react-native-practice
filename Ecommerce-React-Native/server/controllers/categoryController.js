import categoryModel from "../model/categoryModel.js";
import productModel from "../model/postModel.js";

export const createCategoryController=async(req,res)=>{
    try{
        const {category}=req.body;
        if(!category){
            return res.status(404).send({
                success:false,
                message:'please provide category name'
            })
        }
        await categoryModel.create({category})
        return res.status(200).send({
            success:true,
            message:`${category} category added successfully`
        })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'error in creating',
            error
        })
    }
}

export const getAllCategoryController=async(req,res)=>{
    try{
        const categories=await categoryModel.find({})
        return res.status(200).send({
            success:true,
            message:'fetched successfully',
            totalCat:categories.length,
            categories
        })
        
    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'error in creating',
            error
        })
    }
}

export const deleteCategoryController=async(req,res)=>{
    try{
        const category=await categoryModel.findById(req.params.id)
        if(!category){
            return res.status(404).send({
                success:false,
                message:'not found'
            })
        }
        // find product with category id
        const products=await productModel.find({category:category._id})
        // update product category
        for(let i=0;i<products.length;i++){
            const product=products[i]
            product.category=undefined
            await product.save()
        }
        await category.deleteOne()
        return res.status(200).send({
            success:true,
            message:'Deleted'
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


export const updateCategoryController=async(req,res)=>{
    try{
        const category=await categoryModel.findById(req.params.id)
        if(!category){
            return res.status(404).send({
                success:false,
                message:'not found'
            })
        }
        // get new cat
        const {updatedCategory}=req.body
        // find product with category id
        const products=await productModel.find({category:category._id})
        // update product category
        for(let i=0;i<products.length;i++){
            const product=products[i]
            product.category=updatedCategory
            await product.save()
        }

        if(updatedCategory) category.category=updatedCategory
        await category.save()
        return res.status(200).send({
            success:true,
            message:'updated'
        })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'error in creating',
            error
        })
    }
}

