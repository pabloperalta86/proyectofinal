import { productManager } from "../models/index.js";

const getProducts = async()=>{
    return await productManager.getAll();
};

const getProductById = async(id)=>{
    return await productManager.getById(id);
};

const saveProduct = async(user)=>{
    return await productManager.save(user);
};

const updateProductById = async(body,id)=>{
    return await productManager.updateById(body, id);
};

const deleteProductById = async(id)=>{
    return await productManager.deleteById(id);
};

const deleteProducts = async(id)=>{
    return await productManager.deleteAll();
};

export {getProducts,saveProduct,getProductById,updateProductById,deleteProductById,deleteProducts};
