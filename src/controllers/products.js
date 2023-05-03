import {getProducts,saveProduct,getProductById,updateProductById,deleteProductById,deleteProducts} from "../services/products.js";

const getProductsController = async(req,res)=>{
    try {
        const users = await getProducts();
        res.json({status:"success",data:users});
    } catch (error) {
        console.log(error);
        res.json({status:"error",message:error.message});
    }
};

const postProductController = async(req,res)=>{
    try {
        const user = await saveProduct(req.body);
        res.json({status:"success", data:user});
    } catch (error) {
        console.log(error);
        res.json({status:"error",message:error.message});
    }
}

const getProductByIdController = async(req,res)=>{
    try {
        const users = await getProductById(req.params.id);
        res.json({status:"success",data:users});
    } catch (error) {
        console.log(error);
        res.json({status:"error",message:error.message});
    }
};

const updateProductByIdController = async(req,res)=>{
    try {
        const users = await updateProductById(req.body, req.params.id);
        res.json({status:"success",data:users});
    } catch (error) {
        console.log(error);
        res.json({status:"error",message:error.message});
    }
};

const deleteProductsController = async(req,res)=>{
    try {
        const users = await deleteProducts();
        res.json({status:"success",data:users});
    } catch (error) {
        console.log(error);
        res.json({status:"error",message:error.message});
    }
};

const deleteProductByIdController = async(req,res)=>{
    try {
        const users = await deleteProductById(req.params.id);
        res.json({status:"success",data:users});
    } catch (error) {
        console.log(error);
        res.json({status:"error",message:error.message});
    }
};

export {getProductsController,postProductController,getProductByIdController,updateProductByIdController,deleteProductsController,deleteProductByIdController};