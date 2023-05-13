import {CartDTO} from "../daos/dtos/carts.js";

class CartRepository{
    constructor(dao){
        this.dao=dao;
    };

    async getCarts(){
        const carts = await this.dao.getAll();
        const newCartsDto = carts.map(cart=>new CartDTO(cart));
        return newCartsDto;
    };

    async saveCart(cart){
        return await this.dao.create(cart);
    };

    async getCartById(id){
        return await this.dao.getById(id);
    };
}

export {CartRepository};