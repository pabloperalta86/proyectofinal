import {buildSchema} from "graphql";
import {graphqlHTTP} from "express-graphql";
import {ProductService} from "../repositories/index.js";

const schemaGraphql = buildSchema(`
    type Product{
        _id: String,
        title: String,
        price: Float
        thumbnail: String
    }

    input ProductInput{
        title: String,
        price: Float,
        thumbnail: String
    }

    type Query{
        getProducts: [Product],
        getProductById(id:String): Product
    }

    type Mutation{
        saveProduct(product:ProductInput): Product,
        deleteProduct(id:String): String
    }
`);

const graphqlProductsController = ()=>{
    return graphqlHTTP({
        schema:schemaGraphql,
        rootValue:ProductService,
        graphiql:true
    })
};

export {graphqlProductsController};