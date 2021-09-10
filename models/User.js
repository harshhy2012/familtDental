const mongoose = require("mongoose");
const {isEmail, isMobilePhone } = require("validator");

const userSchema = new mongoose.Schema({
    name: {type: String,
           required: [true, ''],
           },
    phone: {
            type: String,
            required: [true, 'Please enter a phone number!'],
            validator: [isMobilePhone, 'Non-existent phone number']
    },
    email: {
            type: String,
            required: [true, 'Please enter an email'],
            unique: true,
            lowercase: true,
            validate: [isEmail, 'Please enter a valid email']
    },
    message: String,
});

userSchema.pre('save', async function(doc, next){
//     // send data to api to send mail to doctors.
});


userSchema.post('save', async function(doc, next){
    console.log("The user has been added to database", doc);
});

const User = mongoose.model("user", userSchema);

module.exports = User; 
