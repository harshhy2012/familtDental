/* jshint esversion: 8 */
const User = require("../models/User");
const Blog = require('../models/Blogpost');


const handleMainErrors = (err) => {
    //   console.log(err);
    let errors = { name: '', email: '', phone: '' };

    //duplicate error
    if (err.message === 'Please enter a name!') {
        errors.name = 'Name cannot be blank!';
        //return errors;
    }
    if (err.message === 'Please enter an email!') {
        errors.email = 'email cannot be blank!';
        //return errors;
    }
    else if (err.message === 'Incorrect email!') {
        errors.email = 'the email is not valid!';
        //return errors;
    }
    if (err.message === 'Please enter a phone number!') {
        errors.phone = 'that phone number is not valid';
        //return errors;
    }
    else if (err.message === 'Incorrect phone number!') {
        errors.phone = 'that phone number is not valid';
        //return errors;
    }

    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
            console.log(errors[properties.path]);
        });
    }
    return errors;
};

module.exports.landingPage_get = (req, res) => {
    res.render("home");
};

module.exports.landingPage_post = async (req, res) => {
    //console.log("chal gya");
    const { name, phone, email, message } = req.body;
    try {
        const user = await User.create({ name, phone, email, message });
        res.status(201).json({ user: user._id });

    }
    catch (err) {
        //console.log(err);
        console.log("*************************************************ERRORS BEFORE HANDLE***************************************************");
        const errors = handleMainErrors(err);
        console.log("*************************************************ERRORS after handle***************************************************");
        res.status(400).json({ errors });
    }
};

module.exports.ourClinic_get = (req, res) => {
    res.render('ourClinic');
};

module.exports.ourDoctors_get = (req, res) => {
    res.render('ourDoctors');
};
module.exports.invisalign_get = (req, res) => {
    res.render('invisalign');
};
module.exports.implants_get = (req, res) => {
    res.render('implants');
};
module.exports.treatments_get = (req, res) => {
    res.render('treatments');
};

module.exports.blog_get = async (req, res) => {
    try{const result = await Blog.find();
        console.log(result);
        res.render("Blog", {blogs: result});
      }
      catch (err) {
        console.log("\nerror here: \n",err);
      }
};
