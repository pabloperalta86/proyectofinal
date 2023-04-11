import mongoose from "../db/conexion.js";

    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;
    const UserSchema = new Schema({
        user: String,
        password: String,
        nombre: String,
        edad: Number,
        direccion: String,
        telefono: String,
        foto: String
    });
    
const users = new mongoose.model('users', UserSchema);

export {users};