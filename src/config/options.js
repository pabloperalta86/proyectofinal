import dotenv from "dotenv";
dotenv.config();

const options = {
    server:{
        port:process.env.PORT,
        mode:process.env.SERVER_MODE,
        secret:process.env.SECRET_SESSION,
        persistence:process.env.PERSISTENCE
    },
    mongo:{
        url:process.env.MONGO_URL
    },
    email:{
        user:process.env.USER_GMAIL,
        password:process.env.PWD_GMAIL
    }
}

export {options};