/* jshint esversion: 8 */
const User = require("../models/User");
const Blog = require('../models/Blogpost');
const fs = require('fs');


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
    console.log(err.mesage);

    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
            console.log(errors[properties.path]);
        });
    }
    return errors;
};

module.exports.landingPage_get = (req, res) => {
    res.render("./main/home");
};

module.exports.landingPage_post = async (req, res) => {
    //console.log("chal gya");
    const { name, phone, email, message } = req.body;
    try {
        const user = await User.create({ name, phone, email, message });
        res.status(201).json({ user: user._id });

    }
    catch (err) {
        console.log(err);
        console.log("*************************************************ERRORS BEFORE HANDLE***************************************************");
        const errors = handleMainErrors(err);
        console.log("*************************************************ERRORS after handle***************************************************");
        res.status(400).json({ errors });
    }
};

module.exports.ourClinic_get = (req, res) => {
    res.render('./main/ourClinic');
};

module.exports.ourDoctors_get = (req, res) => {
    res.render('./main/ourDoctors');
};
module.exports.invisalign_get = (req, res) => {
    res.render('./main/invisalign');
};
module.exports.flash_get = (req, res) => {
    res.render('./main/flash');
};
module.exports.technology_get = (req, res) => {
    res.render('./main/technology');
};
module.exports.implants_get = (req, res) => {
    res.render('./main/implants');
};
module.exports.treatments_get = (req, res) => {
    res.render('./main/treatments');
};

module.exports.blog_get = async (req, res) => {
    let {page} = req.params;
    try{
        if(!page){
            page = 1;
        }
        const limit = 8;
        const skip = (page-1)*limit;
        const result = await Blog.find({}, {}, {limit: limit, skip: skip});
        //console.log(result);
        res.render("./main/blog", {blogs: result});
      }
      catch (err) {
        console.log("\nerror here: \n",err);
      }
};

// blog pagination addition

module.exports.blogPost_get = async (req,res) => {
    const reqBlog = req.params.blog_id;
    try{
        const result = await Blog.findOne({_id: reqBlog});
        res.render("./main/blogPost", {blog: result});
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
};