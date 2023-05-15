class ProductsMongo{
    constructor(model){
        this.model = model;
    }

    async getById(id){
        try {
            const object = await this.model.findById(id);
            if(!object){
                return {message:`Error al buscar: no se encontró el id ${id}`, error:true};
            } else {
                return {message: object, error:false};
            }
        } catch (error) {
            return {message:`Hubo un error ${error}`, error:true};
        }
    }

    async getAll(){
        try {
            const objects = await this.model.find();
            return objects;
        } catch (error) {
            return [];
        }
    }

    async save(product){
        try {
            let input = product; 
            if(product.product) input = product.product
            const object = await this.model.create(input);
            return object
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateById(body, id){
        try {
            const updateProduct = await this.model.findByIdAndUpdate(id, body,{new:true});
            return updateProduct;
        } catch (error) {
            return {message:`Error al actualizar: no se encontró el id ${id}`};
        }
    }

    async deleteById(id){
        try {
            await this.model.findByIdAndDelete(id);
            return {message:"delete successfully"};
        } catch (error) {
            return {message:`Error al borrar: no se encontró el id ${id}`};
        }
    }

    async deleteAll(){
        try {
            await this.model.delete({});
            return {message:"delete successfully"}
        } catch (error) {
            return {message:`Error al borrar todo: ${error}`};
        }
    }
}

export {ProductsMongo};