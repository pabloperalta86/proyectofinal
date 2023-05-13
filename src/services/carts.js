import {getDaos} from "../daos/factory.js";
import {options} from "../config/options.js";
import {CartDTO} from "../daos/dtos/carts.js";

const {cartManager} = await getDaos(options.server.persistence);

const getCarts = async()=>{
    return await cartManager.getAll();
};

const getCartById = async(id)=>{
    return await cartManager.getById(id);
};

const saveCart = async(user)=>{
    return await cartManager.save(user);
};

const updateCartById = async(body,id)=>{
    return await cartManager.updateById(body, id);
};

const deleteCartById = async(id)=>{
    return await cartManager.deleteById(id);
};

const deleteCarts = async(id)=>{
    return await cartManager.deleteAll();
};

export {getCarts,saveCart,getCartById,updateCartById,deleteCartById,deleteCarts};