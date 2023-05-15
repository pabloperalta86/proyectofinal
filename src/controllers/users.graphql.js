import {buildSchema} from "graphql";
import {graphqlHTTP} from "express-graphql";
import {UserService} from "../repositories/index.js";

const schemaGraphql = buildSchema(`
    type User{
        _id: String,
        user: String,
        password: String,
        nombre: String,
        edad: Int,
        direccion: String,
        telefono: String,
        foto: String
    }

    input UserInput{
        user: String,
        password: String,
        nombre: String,
        edad: Int,
        direccion: String,
        telefono: String,
        foto: String
    }

    type Query{
        getUsers: [User],
        getUserById(id:String): User
    }

    type Mutation{
        addUser(user:UserInput): User,
        deleteUser(id:String): String
    }
`);

const graphqlUsersController = ()=>{
    return graphqlHTTP({
        schema:schemaGraphql,
        rootValue:UserService,
        graphiql:true
    })
};

export {graphqlUsersController};