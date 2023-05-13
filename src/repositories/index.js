import {UserRepository} from "./users.js";
import {CartRepository} from "./carts.js";
import {ProductRepository} from "./Products.js";
import {getDaos} from "../daos/factory.js";
import {options} from "../config/options.js";

const {userManager, productManager, cartManager} = await getDaos(options.server.persistence);

const UserService = new UserRepository(userManager);
const CartService = new CartRepository(cartManager);
const ProductService = new ProductRepository(productManager);

export {UserService, CartService, ProductService};