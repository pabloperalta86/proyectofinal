class UsersMemory{
    constructor(){
        this.users=[];
    }

    async getById(id){
        try {
            const object = this.users.find((user) => user.id == id);
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
            const objects = this.users;
            return objects;
        } catch (error) {
            return [];
        }
    }

    async save(data){
        try {
            const leer = this.users
            if (leer.length == 0) {
                const id = 1;
                const nuevoUser = { id: id, ...data }
                const userAdded = this.users.push(nuevoUser)
                return userAdded
            } else {
                const onlyIds = leer.map((usero) => usero.id)
                const largestId = Math.max.apply(Math, onlyIds);
                const id = largestId + 1;
                const nuevoUser = { id: id, ...data }
                const userAdded = this.useros.push(nuevoUser)
                return `new document saved with id: ${id}`
            }
        } catch (error) {
            return {message:`Error al guardar: ${error}`};
        }
    }

    async updateById(body, id){
        try {
            id = parseInt(id)
            const posicionUser = this.users.findIndex((user => user.id === id))
            let userModificado = {id, ...body}
            this.users[posicionUser] = userModificado
        } catch (error) {
            return {message:`Error al actualizar: no se encontró el id ${id}`};
        }
    }

    async deleteById(id){
        try {
            this.users = this.useros.filter((usero) => usero.id != id)
            return {message:"delete successfully"};
        } catch (error) {
            return {message:`Error al borrar: no se encontró el id ${id}`};
        }
    }

    async deleteAll(){
        try {
            this.users = [];
            return {message:"delete successfully"}
        } catch (error) {
            return {message:`Error al borrar todo: ${error}`};
        }
    }
}

export {UsersMemory};