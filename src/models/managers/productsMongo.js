import { ContenedorMongo } from "../models/managers/ContenedorMongo.js";

class ProductosDaoMongo extends ContenedorMongo{
    constructor(model){
        super(model)
    }
}

export {ProductosDaoMongo};