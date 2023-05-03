import { cartManager } from "../models/index.js";

const getCarts = async()=>{
    return await userManager.getAll();
};

const getCartById = async(id)=>{
    return await userManager.getById(id);
};

const saveCart = async(user)=>{
    return await userManager.save(user);
};

const updateCartById = async(body,id)=>{
    return await userManager.updateById(body, id);
};

const deleteCartById = async(id)=>{
    return await userManager.deleteById(id);
};

const deleteCarts = async(id)=>{
    return await userManager.deleteAll();
};

export {getCarts,saveCart,getCartById,updateCartById,deleteCartById,deleteCarts};