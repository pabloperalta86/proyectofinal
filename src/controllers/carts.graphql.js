import {buildSchema} from "graphql";
import {graphqlHTTP} from "express-graphql";
import {CartService} from "../repositories/index.js";

const schemaGraphql = buildSchema(`
    type Cart{
        _id: String,
        products: [String]
    }

    input CartInput{
        products: [String]
    }

    type Query{
        getCarts: [Cart],
        getCartById(id:String): Cart
    }

    type Mutation{
        addCart(user:CartInput): Cart,
        deleteCart(id:String): String
    }
`);

const graphqlCartsController = ()=>{
    return graphqlHTTP({
        schema:schemaGraphql,
        rootValue:CartService,
        graphiql:true
    })
};

export {graphqlCartsController};