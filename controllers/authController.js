/* jshint esversion: 8 */
require("dotenv").config();

const cookieParser = require("cookie-parser");
const Blog = require('../models/Blogpost');
const User = require('../models/User');
const Image = require('../models/Image');

const jwt = require('jsonwebtoken');



module.exports.adminLandingPage_get = async (req,res) => {
  try{
    const users = await User.find();
    console.log(users);
    res.render('./backdoor/backdoor', {users: users});
  }
  catch(err){
    console.log("db error: \n", err);
  }
};

module.exports.adminLandingPage_post = (req,res) => {
   
};

module.exports.addBlog_get = (req,res) => {
    res.render("./backdoor/addBlog");
};
module.exports.addBlog_post = async (req,res) => {
  const {title, topic, content} = req.body;
  console.log("blog content: ", content);
  try{
    const blog = await Blog.create({title, topic, content});
    res.status(201).json({id: blog._id, title: blog.title, topic: blog.topic, body: blog.content});
  }
  catch(err){
    console.log(err);
    res.status(400).json({errors});
  }
};

module.exports.addAlbum_get = (req,res) => {
    res.render('./backdoor/addAlbum');
};

module.exports.addAlbum_post = (req,res) => {
//   //
};

module.exports.logout_get = (req,res) => {
  res.cookie('jwt','', {maxAge: 1});
  res.redirect('/admin');
};