import { userManager } from "../models/index.js";

const getUsers = async()=>{
    return await userManager.getAll();
};

const getFindUser = async()=>{
    return await userManager.getFindOne();
};

const getUserById = async(id)=>{
    return await userManager.getById(id);
};

const saveUser = async(user)=>{
    return await userManager.save(user);
};

const updateUserById = async(body,id)=>{
    return await userManager.updateById(body, id);
};

const deleteUserById = async(id)=>{
    return await userManager.deleteById(id);
};

const deleteUsers = async(id)=>{
    return await userManager.deleteAll();
};

export {getUsers,saveUser,getUserById,updateUserById,deleteUserById,deleteUsers,getFindUser};
