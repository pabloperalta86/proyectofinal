import express from "express";
import isAuth from "../middlewares/auth.js";
import {deleteCartProduct,saveCartProduct,getCartProductsById,avisoSmsController,avisoWhatsappController,
        getCartsController,postCartController,getCartByIdController,updateCartByIdController,deleteCartsController,
        deleteCartByIdController} from "../controllers/carts.js";

const cartsRouter = express.Router();

cartsRouter.get('/', isAuth, getCartsController)
cartsRouter.get('/:id', isAuth, getCartByIdController)

cartsRouter.post('/', isAuth, postCartController)
cartsRouter.delete('/:id', isAuth, deleteCartByIdController)
cartsRouter.get('/:id/productos', getCartProductsById)
cartsRouter.post('/:id/productos', isAuth, saveCartProduct)
cartsRouter.put('/:id', isAuth, updateCartByIdController)
cartsRouter.delete('/:id/productos/:idProd', isAuth, deleteCartProduct)
cartsRouter.post("/aviso-whatsapp/",avisoWhatsappController);
cartsRouter.post("/aviso-sms", avisoSmsController);
cartsRouter.delete('/', isAuth, deleteCartsController)

export default cartsRouter;