import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


const userGmail = process.env.USER_GMAIL

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: userGmail,
        pass: process.env.PWD_GMAIL
    },
    secure:false,
    tls:{
        rejectUnauthorized:false
    }
});

export {transporter, userGmail};