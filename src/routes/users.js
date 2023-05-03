import { upload } from "../storage/storage.js";
import {getUsersController,postSignUpController,getSignUpErrorController,postLogOutController,getProfileController,
    postRegisterController} from "../controllers/users.js"
import {passport} from "../middlewares/login.js";
import express from "express";

const usersRouter = express.Router();

usersRouter.post("/signup", passport.authenticate("local",{
    failureRedirect:"/api/auth/signupError",
    failureMessage:"Usuario o contraseña incorrecto"
}), postSignUpController);
usersRouter.get("/signupError",getSignUpErrorController);
usersRouter.post("/logout",postLogOutController);
usersRouter.get("/profile",getProfileController);
usersRouter.post("/register", upload.single("foto"), postRegisterController);
usersRouter.get("/",getUsersController);

export default usersRouter;