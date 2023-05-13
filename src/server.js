import express from "express";
import cluster from "cluster";
import session from "express-session";
import { engine } from "express-handlebars";
import passport from "passport";
import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
import usersRouter from "./routes/users.js";
import { logger } from "./utils/log/logger.js";
import os from "os";
import {ConnectDB} from "./config/dbConnection.js";
const PORT = process.env.PORT || 8080;
const MODE = process.env.SERVER_MODE || "FORK";
global.AdminEmail = "pablo.cavs.86@gmail.com";

const app = express();

if (MODE === "CLUSTER" && cluster.isPrimary){
    for(let i=0; i<os.cpus; i++){
        cluster.fork();
    };

    cluster.on("exit",(worker)=>{
        logger.warn(`proceso ${worker.process.pid} murio`);
        cluster.fork();
    });

} else {

    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(express.static('public'));
    app.use("/public", express.static("./src/storage/imgs/"));

    app.use(session({
        secret:process.env.SECRET_SESSION,
        resave:false,
        saveUninitialized:false,
        rolling:true,
        cookie:{maxAge: 6000000}
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/api/productos', productsRouter);
    app.use('/api/carritos', cartsRouter);
    app.use("/api/auth", usersRouter);
    
    app.use((req,_res,next) => {
        logger.info(`Ruta inexistente en el servidor: ${req.url} - Metodo: ${req.method}`);
        logger.warn(`Ruta inexistente en el servidor: ${req.url} - Metodo: ${req.method}`);
        next();
    });
    app.set('views', './views'); 
    app.set('view engine', 'hbs');
    app.engine('hbs', engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: './views/layouts',
    }))
    const server = app.listen(PORT, () => {
        logger.info(` >>>>> 🚀 Server started at http://localhost:${PORT} proceso: ${process.pid}`)
    })

    ConnectDB.getInstance();

    server.on('error', (err) => logger.warn(err))
}