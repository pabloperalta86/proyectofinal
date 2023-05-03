import express from "express";
import {getProductsController,postProductController,getProductByIdController,updateProductByIdController,
        deleteProductsController,deleteProductByIdController} from "../controllers/products.js";
import isAuth from "../middlewares/auth.js";

const productsRouter = express.Router();

productsRouter.get('/', isAuth, getProductsController);
productsRouter.get('/:id', isAuth, getProductByIdController)
productsRouter.post('/', isAuth, postProductController)
productsRouter.put('/:id', isAuth, updateProductByIdController)
productsRouter.delete('/:id', isAuth, deleteProductByIdController)
productsRouter.delete('/', isAuth, deleteProductsController)

export default productsRouter;