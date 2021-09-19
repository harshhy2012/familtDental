/* jshint esversion: 8 */
const mongoose = require("mongoose");
const {isEmail, isMobilePhone } = require("validator");

const userSchema = new mongoose.Schema({
    name: {type: String,
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
    replied: { type:Boolean, default: false}
});

userSchema.pre('save', async function(doc, next){
//     // send data to api to send mail to doctors.
});


userSchema.post('save', async function(doc, next){
    console.log("The user has been added to database", doc);
});

const User = mongoose.model("user", userSchema);

module.exports = User; 
