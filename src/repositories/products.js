import {ProductDTO} from "../daos/dtos/products.js";

class ProductRepository{
    constructor(dao){
        this.dao=dao;
    };

    async getProducts(){
        const products = await this.dao.getAll();
        const newProductsDto = products.map(product=>new ProductDTO(product));
        return newProductsDto;
    };

    async saveProduct(product){
        return await this.dao.save(product);
    };

    async getProductById(id){
        return await this.dao.getById(id);
    };
}

export {ProductRepository};