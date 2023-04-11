import express from "express";
import isAuth from "../middlewares/auth.js";
import {ContenedorDaoProductos, ContenedorDaoCarritos} from "../daos/index.js";
import {client} from "../messages/msgTexto.js";
import {twilioClient, twiliowhatsappPhone,adminWhatsappPhone} from "../messages/whatsapp.js";

const productosApi = ContenedorDaoProductos;
const carritosApi = ContenedorDaoCarritos;

const cartsRouter = express.Router();

cartsRouter.get('/', isAuth, async (req, res) => {
    const response = await carritosApi.getAll();
    res.json(response);
})

cartsRouter.post('/', isAuth, async (req, res) => {
    const response = await carritosApi.save({ products: [], timestamp: new Date().toLocaleDateString() });
    res.json(response);
})

cartsRouter.delete('/:id', isAuth, async (req, res) => {
    const cartId = req.params.id;
    res.json(await carritosApi.deleteById(cartId));
})

cartsRouter.get('/:id/productos', isAuth, async (req, res) => {
    const cartId = req.params.id;
    const carritoResponse = await carritosApi.getById(cartId);
    if(carritoResponse.error){
        res.json(carritoResponse);
    } else{
        const getData = async()=>{
            const products = await Promise.all(carritoResponse.message.products.map(async(element) => {
                const productResponse = await productosApi.getById(element);
                return productResponse.message
            }));
            res.json({products: products});
        }
        getData();
    }
})

cartsRouter.post('/:id/productos', isAuth, async (req, res) => {
    const cartId = req.params.id;
    const productId = req.body.id;
    const carritoResponse = await carritosApi.getById(cartId);
    if(carritoResponse.error){
        res.json({message:`El carrito con id: ${cartId} no fue encontrado`});
    } else{
        const productoResponse = await productosApi.getById(productId);
        if(productoResponse.error){
            res.json(productoResponse);
        } else{
            carritoResponse.message.products.push(productoResponse.message.id);
            const response = await carritosApi.updateById(carritoResponse.message, cartId);
            res.json({message:"product added"});
        }
    }
})

cartsRouter.delete('/:id/productos/:idProd', isAuth, async (req, res) => {
    const cartId = req.params.id;
    const productId = req.params.idProd;
    const carritoResponse = await carritosApi.getById(cartId);
    if(carritoResponse.error){
        res.json({message:`El carrito con id: ${cartId} no fue encontrado`});
    } else{
        const index = carritoResponse.message.products.findIndex(p => p === productId);
        if (index !== -1) {
            carritoResponse.message.products.splice(index, 1);
            await carritosApi.updateById(carritoResponse.message, cartId);
            res.json({message:"product deleted"});
        } else{
            res.json({message:`El producto no se encontro en el carrito: ${productId}`});
        }
    }
})

cartsRouter.post("/aviso-whatsapp/",async(req,res)=>{
/*    
    const cartId = req.params.id;
    const carritoResponse = await carritosApi.getById(cartId);
    if(carritoResponse.error){
        res.json(carritoResponse);
    } else{
        const getData = async()=>{
            const products = await Promise.all(carritoResponse.message.products.map(async(element) => {
                const productResponse = await productosApi.getById(element);
                return productResponse.message
            }));
            return({products: products});
        }
        const produtos = getData();
    }
*/
    try {
        await twilioClient.messages.create({
            from:twiliowhatsappPhone,
            to: adminWhatsappPhone,
            body:"Se ha registrado un nuevo pedido en la plataforma"
        })
        res.send('El mensaje whatsapp con twilio se envio correctamente');
    } catch (error) {
        res.send(`Hubo un error ${error}`)
    }
});


cartsRouter.post("/aviso-sms", async(req,res)=>{
    try{  
        console.log(req.session.passport.user.telefono)
        const msg = await client.messages.create({    
            from: "+15855171784",     
            to: req.session.passport.user.telefono, 
            body: "Su pedido ha sido recibido y se encuentra en proceso."  
        }) 

        res.send("se envio correctamente el sms");
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

export default cartsRouter;