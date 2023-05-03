import bcrypt from "bcrypt";
import passport from "passport";
import {Strategy} from "passport-local";
import {UserModel} from "../models/dbModels/users.js";

const LocalStrategy = Strategy;
const BCRYP_SALT_ROUNDS = 12;

passport.use(new LocalStrategy(
    async function (username, password, done) {
        const doc = UserModel.findOne({user:username}).then((doc)=>{
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
    const existeUsuario = UserModel.findOne({user:doc.user}).then((doc)=>doc.user == doc.username);   
    done(null, existeUsuario);
});

export {passport};