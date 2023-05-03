import {ProductModel} from "./dbModels/products.js";
import {CartModel} from "./dbModels/carts.js";
import {UserModel} from "./dbModels/users.js";
const {Products} = await import("./managers/products.js");
const {Carts} = await import("./managers/carts.js");
const {Users} = await import("./managers/users.js");

const productManager = new Products(ProductModel);
const cartManager = new Carts(CartModel);
const userManager = new Users(UserModel);

export {productManager,cartManager,userManager};