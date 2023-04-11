import twilio from "twilio"; 

const accountSid = 'AC3b1481a5188159d01b41b15e0bf6211f'; 
const authToken = 'e69d9230f956a26d8bc41f0b64aba6b0'; 
const client = twilio(accountSid, authToken)

export {client};