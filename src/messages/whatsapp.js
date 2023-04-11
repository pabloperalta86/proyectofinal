import twilio from "twilio";

//agregar las credenciales para conectarse a twilio
const accountId = 'AC3b1481a5188159d01b41b15e0bf6211f'; 
const tokenTwilio = 'e69d9230f956a26d8bc41f0b64aba6b0';
//twilio phone
const twiliowhatsappPhone = "whatsapp:+14155238886";
const adminWhatsappPhone = "whatsapp:+5491130041709";  //formato whatsapp:+indicativo y numero

//cliente de node que se conecta al servicio de twilio
const twilioClient = twilio(accountId, tokenTwilio);

export {twilioClient, twiliowhatsappPhone,adminWhatsappPhone};