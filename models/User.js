/* jshint esversion: 8 */
const mongoose = require("mongoose");
const { isEmail, isMobilePhone } = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name!'],
    },
    phone: {
        type: String,
        required: [true, 'Please enter a phone number!'],
        validate: [isMobilePhone, 'Incorrect phone number!']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        lowercase: true,
        validate: [isEmail, 'Incorrect email!']
    },
    message: String,
    replied: { type: Boolean, default: false }
});

userSchema.pre('save', async function (doc, next) {
    //     // send data to api to send mail to doctors.
    var SibApiV3Sdk = require('sib-api-v3-sdk');
    SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.mail_api;
    
    new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
        {
            'subject': 'Hello from the Node SDK!',
            'sender': { 'email': 'harshityadav47@gmail.com', 'name': 'HArshit YAdav' },
            'replyTo': { 'email': 'api@sendinblue.com', 'name': 'Sendinblue' },
            'to': [{ 'name': 'Ayush Malik', 'email': 'ayushmalik03@gmail.com' }],
            'htmlContent': '<html><body><h1>This is a transactional email {{params.bodyMessage}}</h1></body></html>',
            'params': { 'bodyMessage': 'Made just for you! lulle lega?' }
        }
    ).then(function (data) {
        console.log(data);
    }, function (error) {
        console.error(error);
    });
    
});

userSchema.post('save', async function (doc, next) {
    console.log("The user has been added to database", doc);
});

const User = mongoose.model("user", userSchema);

module.exports = User;
