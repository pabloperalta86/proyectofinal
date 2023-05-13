import mongoose from "mongoose";

const userCollection = "users";
const userSchema = new mongoose.Schema({
    user: String,
    password: String,
    nombre: String,
    edad: Number,
    direccion: String,
    telefono: String,
    foto: String
});

const UserModel = mongoose.model(userCollection,userSchema)

export {UserModel};