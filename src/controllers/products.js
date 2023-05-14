import {getProducts,saveProduct,getProductById,updateProductById,deleteProductById,deleteProducts} from "../services/products.js";

const getProductsController = async(req,res)=>{
    try {
        const product = await getProducts();
        if (!product) product = [];
        res.json({status:200,data:product});
    } catch (error) {
        console.log(error);
        res.json({status:"error",message:error.message});
    }
};

const postProductController = async(req,res)=>{
    try {
        const product = await saveProduct(req.body);
        res.json({status:200, data:product});
    } catch (error) {
        console.log(error);
        res.json({status:"error",message:error.message});
    }
}

const getProductByIdController = async(req,res)=>{
    try {
        const product = await getProductById(req.params.id);
        res.json({status:200,data:product});
    } catch (error) {
        console.log(error);
        res.json({status:"error",message:error.message});
    }
};

const updateProductByIdController = async(req,res)=>{
    try {
        const product = await updateProductById(req.body, req.params.id);
        res.json({status:200,data:product});
    } catch (error) {
        console.log(error);
        res.json({status:"error",message:error.message});
    }
};

const deleteProductsController = async(req,res)=>{
    try {
        const product = await deleteProducts();
        res.json({status:200,data:product});
    } catch (error) {
        console.log(error);
        res.json({status:"error",message:error.message});
    }
};

const deleteProductByIdController = async(req,res)=>{
    try {
        const product = await deleteProductById(req.params.id);
        res.json({status:200,data:product});
    } catch (error) {
        console.log(error);
        res.json({status:"error",message:error.message});
    }
};

export {getProductsController,postProductController,getProductByIdController,updateProductByIdController,deleteProductsController,deleteProductByIdController};