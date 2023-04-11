import express from "express";
import bcrypt from "bcrypt";
import {users} from "../models/users.js";
import passport from "passport";
import {Strategy} from "passport-local";
import { upload } from "../storage/storage.js";
import {transporter, userGmail} from "../messages/gmail.js";
import { logger } from "../log/logger.js";


const LocalStrategy = Strategy;
const BCRYP_SALT_ROUNDS = 12;

const authRouter = express.Router();
passport.use(new LocalStrategy(
    async function (username, password, done) {
        const doc = users.findOne({user:username}).then((doc)=>{
            if (username && password){
                if (!doc) {
                    return done(null, false);
                } else {
                    bcrypt.compare(password, doc.password)
                    .then((valid)=>{
                        if (valid){
                            return done(null, doc)
                        } else {
                            return done(null, false)
                        }
                    })
                }           
            }
        });
    }
));

passport.serializeUser((doc, done) => {
    done(null, doc);
});

passport.deserializeUser((doc, done) => {
    const existeUsuario = users.findOne({user:doc.user}).then((doc)=>doc.user == doc.username);   
    done(null, existeUsuario);
});

authRouter.post("/signup", passport.authenticate("local",{
    failureRedirect:"/api/auth/signupError",
    failureMessage:"Usuario o contraseña incorrecto"
}), (req,res)=>{
    res.send("Usuario registrado y autenticado")
});

authRouter.get("/signupError",(req,res)=>{
    const errorMessage = req.session.messages[0] || '';
    req.session.messages = [];
    res.json({error:errorMessage})
});

authRouter.post("/logout",(req,res)=>{
    req.logOut(err=>{
        if(err) return res.status(400).json({error:"No se pudo cerrar la sesion"});
        req.session.destroy(err=>{
            if(err) return res.status(400).json({error:"Error al cerrar la sesion"});
            res.status(200).json({message:"sesion finalizada"})
        });
    });
});

authRouter.get("/profile", (req,res) => {
    res.send(req.session.passport.user);
})

authRouter.post("/register", upload.single("foto"), async(req,res)=>{
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
            res.send("Por favor ingresa el usuario y clave")
        }
    });
});

export default authRouter;