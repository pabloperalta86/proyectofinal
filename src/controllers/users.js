import {getFindUser,getUsers,saveUser,getUserById,updateUserById,deleteUserById,deleteUsers} from "../services/users.js";
import {transporter, userGmail} from "../utils/messages/gmail.js";
import { logger } from "../utils/log/logger.js";

const getUsersController = async(req,res)=>{
    try {
        const users = await getUsers();
        res.json({status:"success",data:users});
    } catch (error) {
        console.log(error);
        res.json({status:"error",message:error.message});
    }
};

const postSignUpController = async(req,res)=>{
    res.send("Usuario registrado y autenticado")
};

const getSignUpErrorController = async(req,res)=>{
    const errorMessage = req.session.messages[0] || '';
    req.session.messages = [];
    res.json({error:errorMessage})
};

const postLogOutController = async(req,res)=>{
    req.logOut(err=>{
        if(err) return res.status(400).json({error:"No se pudo cerrar la sesion"});
        req.session.destroy(err=>{
            if(err) return res.status(400).json({error:"Error al cerrar la sesion"});
            res.status(200).json({message:"sesion finalizada"})
        });
    });
};

const getProfileController = async(req,res) => {
    res.send(req.session.passport.user);
};

const postRegisterController = async(req,res)=>{
    logger.info(`Ruta correcta: ${req.url} - Metodo: ${req.method}`);
    const {username, password, nombre, edad, direccion, telefono, foto} = await req.body;
    const doc = getFindUser({user:username}).then((doc)=>{
        if(username && password){
            if (doc) {
                res.render("registerError");
            } else {
                bcrypt.hash(password,BCRYP_SALT_ROUNDS)
                .then(async (hashPassword) =>{
                    try {
                        await saveUser({user:username, password:hashPassword, nombre:nombre, edad:edad, 
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
};

export {getUsersController,postSignUpController,getSignUpErrorController,postLogOutController,getProfileController,
    postRegisterController};