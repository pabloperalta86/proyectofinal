class UserDTO {
    constructor(user) {
        this._id = user._id;
        this.user = user.user;
        this.password = user.password;
        this.nombre = user.nombre;
        this.edad = user.edad;
        this.direccion = user.direccion;
        this.telefono = user.telefono;
        this.foto = user.foto
    }
}

export {UserDTO};