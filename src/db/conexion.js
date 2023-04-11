import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL)
    .then(()=> {
        console.log('Base de datos conectada');
    }).catch((err)=> {
        console.log('Error al conectar ', err);
    });
    
export default mongoose;