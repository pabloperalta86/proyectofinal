import {ProductModel} from "../models/products.js";
import {CartModel} from "../models/carts.js";

let ContenedorDaoProductos;
let ContenedorDaoCarritos;

const {ProductosDaoMongo} = await import("./productsMongo.js");
const {CarritosDaoMongo} = await import("./cartsMongo.js");
ContenedorDaoProductos = new ProductosDaoMongo(ProductModel);
ContenedorDaoCarritos = new CarritosDaoMongo(CartModel);

export {ContenedorDaoProductos,ContenedorDaoCarritos}