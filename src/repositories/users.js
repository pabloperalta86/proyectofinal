import {UserDTO} from "../daos/dtos/users.js";

class UserRepository{
    constructor(dao){
        this.dao=dao;
    };

    async getUsers(){
        const users = await this.dao.getAll();
        const newUsersDto = users.map(user=>new UserDTO(user));
        return newUsersDto;
    };

    async saveUser(user){
        return await this.dao.create(user);
    };

    async getUserById(id){
        return await this.dao.getById(id);
    };
}

export {UserRepository};