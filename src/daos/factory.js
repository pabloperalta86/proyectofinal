import {ConnectDB} from "../config/dbConnection.js";

const getDaos = async (persistence)=>{
    let userManager;
    let productManager;
    let cartManager;
    switch (persistence) {
        case "mongo":
            ConnectDB.getInstance();
            const {UserModel} = await import("./dbModels/users.js");
            const {ProductModel} = await import("./dbModels/products.js");
            const {CartModel} = await import("./dbModels/carts.js");
            
            const {UsersMongo} = await import("./managers/users/users.mongo.js");
            const {ProductsMongo} = await import("./managers/products/products.mongo.js");
            const {CartsMongo} = await import("./managers/carts/carts.mongo.js");
            
            userManager = new UsersMongo(UserModel);
            productManager = new ProductsMongo(ProductModel);
            cartManager = new CartsMongo(CartModel);
            break;
        case "memory":
            const {UsersMemory} = await import("./managers/users/users.memory.js");
            const {ProductsMemory} = await import("./managers/products/products.memory.js");
            const {CartsMemory} = await import("./managers/carts/carts.memory.js");
            userManager = new UsersMemory();
            productManager = new ProductsMemory();
            cartManager = new CartsMemory();
            break;
    }

    return {userManager, productManager, cartManager}
}

export {getDaos};