import {getDaos} from "../daos/factory.js";
import {options} from "../config/options.js";
import {ProductDTO} from "../daos/dtos/products.js";

const {productManager} = await getDaos(options.server.persistence);

const getProducts = async()=>{
    return await productManager.getAll();
};

const getProductById = async(id)=>{
    return await productManager.getById(id);
};

const saveProduct = async(user)=>{
    return await productManager.save(new ProductDTO(user));
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
