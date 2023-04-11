import express from "express";
import {ContenedorDaoProductos} from "../daos/index.js";
import isAuth from "../middlewares/auth.js";

const productosApi = ContenedorDaoProductos;
const productsRouter = express.Router();

productsRouter.get('/', isAuth, async (req, res) => {
    const response = await productosApi.getAll()
    res.json(response)
});

productsRouter.get('/:id', isAuth, async (req, res) => {
    const productId = req.params.id;
    const response = await productosApi.getById(productId);
    res.json(response);
})

productsRouter.post('/', isAuth, async (req, res) => {
    const response = await productosApi.save(req.body);
    res.json(response)
})

productsRouter.put('/:id', isAuth, async (req, res) => {
    const productId = req.params.id;
    const response = await productosApi.updateById(req.body, productId);
    res.json(response);
})

productsRouter.delete('/:id', isAuth, async (req, res) => {
    const productId = req.params.id;
    const response = await productosApi.deleteById(productId);
    res.json(response);
})

export default productsRouter;