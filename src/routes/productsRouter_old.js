import express from "express";
import isAuth from "../middlewares/auth.js";
import passport from "passport";
import { logger } from "../log/logger.js";
import { upload } from "../storage/storage.js";
import { users } from "../models/users.js";

import bcrypt from "bcrypt";
import {transporter, userGmail} from "../messages/gmail.js";

const BCRYP_SALT_ROUNDS = 12;

const productsRouter = express.Router();

productsRouter.get("/", isAuth, (req,res) => {
    logger.info(`Ruta correcta: ${req.url} - Metodo: ${req.method}`);
    res.render('home',{username:req.session.passport.user.user,userimg:"/public/"+ req.session.passport.user.foto});
})

productsRouter.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login-error' }));

productsRouter.post("/register", upload.single("foto"), async(req,res)=>{
    logger.info(`Ruta correcta: ${req.url} - Metodo: ${req.method}`);
    const {username, password, nombre, edad, direccion, telefono, foto} = await req.body;
    const doc = users.findOne({user:username}).then((doc)=>{
        if(username && password){
            if (doc) {
                res.render("registerError");
            } else {
                bcrypt.hash(password,BCRYP_SALT_ROUNDS)
                .then(async (hashPassword) =>{
                    try {
                        await users.create({user:username, password:hashPassword, nombre:nombre, edad:edad, 
                                direccion:direccion, telefono:telefono, foto: req.file.filename}).then((doc)=>doc);
                        const port = req.app.settings.port || process.env.PORT; 
                        const urlfoto = req.protocol + '://' + req.get("host") + "/public/"+req.file.filename;

                        const emailTemplate = `<div>
                                <h1>Se creo un nuevo Usuario</h1><br>
                                <p>user: ${username} <br> 
                                password: ******* <br>
                                nombre: ${nombre} <br>
                                edad: ${edad} <br> 
                                direccion: ${direccion} <br>
                                telefono: ${telefono} <br> 
                                foto: ${urlfoto}</p> 
                                <img src="${urlfoto}" style="width:250px"/>
                                </div>`;
                                console.log(emailTemplate)
                        const mailOptions = {
                                from:userGmail,
                                to:global.AdminEmail,
                                subject:"Nuevo usuario - App e-commerce",
                                html:emailTemplate
                            };
                        try {
                            await transporter.sendMail(mailOptions);
                            //res.send(`Se envio el mensaje a ${global.AdminEmail}`);
                            res.redirect("/login");
                            logger.info(`Se envio el mensaje a ${global.AdminEmail}`);
                        } catch (error) {
                            res.send(error);
                            logger.info(error);
                        }
                    } catch (error) {
                        res.send(error);
                        logger.info(error);
                    }
                });
            }
        } else{
            res.render("register",{error:"por favor ingresa el usuario y clave"})
        }
    });
});

productsRouter.get("/register",(req,res)=>{
    logger.info(`Ruta correcta: ${req.url} - Metodo: ${req.method}`);
    res.render("register")
});

productsRouter.get("/logout",(req,res)=>{
    logger.info(`Ruta correcta: ${req.url} - Metodo: ${req.method}`);
    req.session.destroy((error)=>{
        if(error){
            res.redirect("/")
        } else{
            res.render("logout")
        }
    })
});

productsRouter.get("/login-error",(req,res)=>{
    logger.info(`Ruta correcta: ${req.url} - Metodo: ${req.method}`);
    res.render("loginError");
});

productsRouter.get("/login",(req,res)=>{
    logger.info(`Ruta correcta: ${req.url} - Metodo: ${req.method}`);
    res.render("login");
});

productsRouter.get("/products", isAuth, async(req,res)=>{
    logger.info(`Ruta correcta: ${req.url} - Metodo: ${req.method}`);
    try {
        const results = await products.find({});
        res.send(results);
    } catch (err) {
        logger.error(err);
    }
});

productsRouter.post("/products", isAuth, async(req,res)=>{
    const {codigo, descripcion, precio, imagen} = await req.body;
    logger.info(`Ruta correcta: ${req.url} - Metodo: ${req.method}`);
    try {
        await products.create({codigo:codigo, descripcion:descripcion, precio:precio, imagen:imagen}).then((doc)=>doc);
        await res.send("Producto creado")
    } catch (err) {
        logger.error(err);
    }
});

productsRouter.get("/profile", isAuth, (req,res) => {
    logger.info(`Ruta correcta: ${req.url} - Metodo: ${req.method}`);
    res.send(req.session.passport.user);
})

productsRouter.get("/cart", isAuth, async(req,res) => {
    logger.info(`Ruta correcta: ${req.url} - Metodo: ${req.method}`);
    const doc = carts.findOne({iduser:req.session.passport.user._id}).then((doc)=>{
        if (doc) {
            res.send(doc);
        } else {
            res.send("No existe carrito");
        }
    })
})

productsRouter.post("/cart", isAuth, async(req,res) => {
    logger.info(`Ruta correcta: ${req.url} - Metodo: ${req.method}`);
    const doc = carts.findOne({iduser:req.session.passport.user._id,estado:"Pendiente"}).then( async (doc)=>{
        if (doc) {
            res.send("Ya existe carrito en estado pendiente");
        } else {
            await carts.create({idUser:req.session.passport.user._id, estado:"Pendiente"}).then((doc)=>doc);
            await res.send("Carrito creado")
        }
    })
})

export default productsRouter;