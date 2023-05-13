class ProductsMemory{
    constructor(){
        this.products=[];
    }

    async getById(id){
        try {
            const object = this.products.find((product) => product.id == id);
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
            const objects = this.products;
            return objects;
        } catch (error) {
            return [];
        }
    }

    async save(data){
        try {
            const leer = this.products
            if (leer.length == 0) {
                const id = 1;
                const nuevoProducto = { id: id, ...data }
                const productAdded = this.products.push(nuevoProducto)
                return productAdded
            } else {
                const onlyIds = leer.map((producto) => producto.id)
                const largestId = Math.max.apply(Math, onlyIds);
                const id = largestId + 1;
                const nuevoProducto = { id: id, ...data }
                const productAdded = this.productos.push(nuevoProducto)
                return `new document saved with id: ${id}`
            }
        } catch (error) {
            return {message:`Error al guardar: ${error}`};
        }
    }

    async updateById(body, id){
        try {
            id = parseInt(id)
            const posicionProduct = this.products.findIndex((product => product.id === id))
            let productModificado = {id, ...body}
            this.products[posicionProduct] = productModificado
        } catch (error) {
            return {message:`Error al actualizar: no se encontró el id ${id}`};
        }
    }

    async deleteById(id){
        try {
            this.products = this.productos.filter((producto) => producto.id != id)
            return {message:"delete successfully"};
        } catch (error) {
            return {message:`Error al borrar: no se encontró el id ${id}`};
        }
    }

    async deleteAll(){
        try {
            this.products = [];
            return {message:"delete successfully"}
        } catch (error) {
            return {message:`Error al borrar todo: ${error}`};
        }
    }
}

export {ProductsMemory};