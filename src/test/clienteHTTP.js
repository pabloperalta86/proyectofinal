import axios from 'axios';

const url = 'http://localhost:4000';
axios.defaults.withCredentials = true;

const login = async() => {
    try {
        const response = await axios.post(`${url}/api/auth/signup`, {
            username: "pablo.cavs.86@gmail.com",
            password: "123"
        })
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}

const getProduct = async () => {
    try {
        const response = await axios.get(`${url}/api/productos`);
        console.log(response.data);
    } catch (error) {
        console.log(error.response.data)
    }
}

const updateProduct = async (id, data) => {
    try {
        const response = await axios.put(`${url}/api/productos/${id}`, data)
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}

const addProduct = async (data) => {
    try {
        const response = await axios.post(`${url}/api/productos`, data);
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}

const deleteProduct = async (id) => {
    try {
        await axios.delete(`${url}/api/productos/${id}`)
        console.log("producto borrado")
    } catch (error) {
        console.log(error)
    }
}

const data = {
    nombre: "pikachu 8",
    precio: 4570,
    imagen: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c325.png"
};

await login();
await getProduct();
await updateProduct(data);
await addProduct(data);
await deleteProduct(id);