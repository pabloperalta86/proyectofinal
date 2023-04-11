import mongoose from "../db/conexion.js";

const cartCollection = "carts";
const cartSchema = new mongoose.Schema({
    products:{
        type:Array,
        required:true
    }
},
{
    timestamps:true
});

export const CartModel = mongoose.model(cartCollection,cartSchema);