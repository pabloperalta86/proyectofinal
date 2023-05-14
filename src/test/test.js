import supertest from "supertest";
import chai from "chai";
import {app} from '../server.js';
import {ProductModel} from "../daos/dbModels/products.js"

const request = supertest(app);
const expect = chai.expect;

describe("Test API products", function() {
    console.log("Before: Este codigo se ejecuta antes de todas las pruebas");
    before(async function() {
            console.log("Login")
            const newLogin = {
                username: "pablo.cavs.86@gmail.com",
                password: "123"
            }    
            const response = await request.post("/api/auth/signup").send(newLogin);
            console.log(response.text);
            await ProductModel.deleteMany({});
        });

    it("GET Productos", async function() {
        const response = await request.get("/api/productos")
        expect(response.body.status).to.equal(200);
        expect(response.body.data).to.deep.equal([])
    })

    it("POST producto", async function() {
        const newObject = {
            title: "pokemon",
            price: 5600,
            thumbnail: "http://imagen.jpg"
        }
        const response = await request.post("/api/productos").send(newObject);
        expect(response.status).to.equal(200);
        const datosDB = await request.get("/api/productos");
        expect(datosDB.body.data.length).to.equal(1)
    });

    it("PUT Producto", async function() {
        const newObject = {
            title: "Picachu Put",
            price: 3200,
            thumbnail: "http://imagen.jpg"
        }
        const producto = await request.get("/api/productos")
        expect(producto.body.status).to.equal(200);
        const id = producto.body.data[0]._id
        const response = await request.put(`/api/productos/${id}`).send(newObject);
        expect(response.body.status).to.equal(200);
        expect(response.body.data).to.haveOwnProperty("_id")
    });

    it("DELETE Producto", async function() {
        const producto = await request.get("/api/productos")
        expect(producto.body.status).to.equal(200);
        const id = producto.body.data.id
        const deleteProduct = await request.delete(`/api/productos/${id}`)
        expect(deleteProduct.body.status).to.equal(200);
    });
})