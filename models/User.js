/* jshint esversion: 8 */
const { data } = require("jquery");
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

});

userSchema.post('save', async function (doc, next) {
    
    var SibApiV3Sdk = require('sib-api-v3-sdk');
    SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.mail_api;
    
    new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
        {
            'subject': 'New patient filled website form.',
            'sender': { 'email': 'familydentaldwarka@gmail.com', 'name': 'Family Dental' },
            'replyTo': { 'email': 'familydentaldwarka@gmail.com', 'name': 'Family Dental' },
            'to': [{ 'name': 'Mahima Yadav', 'email': 'mahimayadav56618@gmail.com' },
                   { 'name': 'Tushita Singh', 'email': 'harshityadav47@gmail.com' },
                   { 'name': 'Family Dental', 'email': 'familydentaldwarka@gmail.com' }],
            'htmlContent': '<html><body><h1>New patient filled the form.</h1></body></html><br><p>{{params.name}}</p><p>{{params.phone}}</p><p>{{params.email}}<p>{{params.message}}</p></p>',
            'params': { 'name': 'Name: ' + doc.name,
                        'phone': 'Phone: ' + doc.phone,
                        'email': 'Email: ' + doc.email,
                        'message': 'Message: ' + doc.message}
        }
        
    ).then(function (data) {
        console.log(data);
    }, function (error) {
        console.error(error);
    });

    console.log("The user has been added to database", doc);
});

const User = mongoose.model("user", userSchema);

module.exports = User;
