import mongoose from "mongoose";

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
    
const UserModel = new mongoose.model('users', UserSchema);

export {UserModel};