import mongoose from "mongoose";
import {options} from "./options.js";

class ConnectDB{
    static #instance;

    constructor(){
       // mongoose.set('strictQuery', false);
        mongoose.connect(options.mongo.url)
      //  .then(()=> {
     //       console.log('Base de datos conectada');
     //   }).catch((err)=> {
     //       console.log('Error al conectar ', err);
     //   });
    }

    static async getInstance(){
        if(ConnectDB.#instance){
            console.log("La base de datos ya esta conectada");
            return ConnectDB.#instance;
        }
        this.#instance = new ConnectDB();
        console.log('Base de datos conectada');
        return this.#instance;
    }
}

export {ConnectDB};