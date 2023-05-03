import mongoose from "mongoose";
import {options} from "./options.js";

mongoose.set('strictQuery', false);
mongoose.connect(options.mongo.url)
    .then(()=> {
        console.log('Base de datos conectada');
    }).catch((err)=> {
        console.log('Error al conectar ', err);
    });
    
export default mongoose;