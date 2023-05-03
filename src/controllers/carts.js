import {getCarts,saveCart,getCartById,updateCartById,deleteCartById,deleteCarts} from "../services/carts.js";
import {getProductById} from "../services/products.js";
import {client} from "../utils/messages/msgTexto.js";
import {twilioClient, twiliowhatsappPhone,adminWhatsappPhone} from "../utils/messages/whatsapp.js";

const getCartsController = async(req,res)=>{
    try {
        const users = await getCarts();
        res.json({status:"success",data:users});
    } catch (error) {
        console.log(error);
        res.json({status:"error",message:error.message});
    }
};

const postCartController = async(req,res)=>{
    try {
        const user = await saveCart({ products: [], timestamp: new Date().toLocaleDateString() });
        res.json({status:"success", data:user});
    } catch (error) {
        console.log(error);
        res.json({status:"error",message:error.message});
    }
}

const getCartByIdController = async(req,res)=>{
    try {
        const users = await getCartById(req.params.id);
        res.json({status:"success",data:users});
    } catch (error) {
        console.log(error);
        res.json({status:"error",message:error.message});
    }
};

const updateCartByIdController = async(req,res)=>{
    try {
        const users = await updateCartById(req.body, req.params.id);
        res.json({status:"success",data:users});
    } catch (error) {
        console.log(error);
        res.json({status:"error",message:error.message});
    }
};

const deleteCartsController = async(req,res)=>{
    try {
        const users = await deleteCarts();
        res.json({status:"success",data:users});
    } catch (error) {
        console.log(error);
        res.json({status:"error",message:error.message});
    }
};

const deleteCartByIdController = async(req,res)=>{
    try {
        const users = await deleteCartById(req.params.id);
        res.json({status:"success",data:users});
    } catch (error) {
        console.log(error);
        res.json({status:"error",message:error.message});
    }
};

const getCartProductsById = async(req,res)=>{
    const cartId = req.params.id;
    const carritoResponse = await getCartById(cartId);
    if(carritoResponse.error){
        res.json(carritoResponse);
    } else{
        const getData = async()=>{
            const products = await Promise.all(carritoResponse.message.products.map(async(element) => {
                const productResponse = await getProductById(element);
                return productResponse.message
            }));
            res.json({products: products});
        }
        getData();
    }
}

const saveCartProduct = async(req,res)=>{
    const cartId = req.params.id;
    const productId = req.body.id;
    const carritoResponse = await carritosApi.getById(cartId);
    if(carritoResponse.error){
        res.json({message:`El carrito con id: ${cartId} no fue encontrado`});
    } else{
        const productoResponse = await getProductById(productId);
        if(productoResponse.error){
            res.json(productoResponse);
        } else{
            carritoResponse.message.products.push(productoResponse.message.id);
            const response = await carritosApi.updateById(carritoResponse.message, cartId);
            res.json({message:"product added"});
        }
    }
}

const deleteCartProduct = async(req,res)=>{
    const cartId = req.params.id;
    const productId = req.params.idProd;
    const carritoResponse = await getCartById(cartId);
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
}

const avisoWhatsappController = async(req,res)=>{
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
};

const avisoSmsController = async(req,res)=>{
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
};

export {deleteCartProduct,saveCartProduct,getCartProductsById,avisoSmsController,avisoWhatsappController,getCartsController,postCartController,getCartByIdController,updateCartByIdController,deleteCartsController,deleteCartByIdController};