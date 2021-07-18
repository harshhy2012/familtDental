require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const session = require("express-session");
// const passport = require("passport");

const app = express();
let token = "";
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


//------------------- bcrypt passwords ------------------------//

let admin = { mahima: "",
            tushita: ""
};

const pws = process.env.pw.split(",");

bcrypt.hash(pws[0], parseInt(process.env.SALT_ROUNDS), function (err, hash) {
    admin.mahima = hash;
});

bcrypt.hash(pws[1], process.env.SALT_ROUNDS, function (err, hash) {
    admin.tushita = hash;
});



//------------------- ---------------- ------------------------//

//------------------- blog ------------------------//

mongoose.createConnection("mongodb://localhost:27017/familyDentalDB", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    message: String
});

const User = mongoose.model("User", userSchema);

const postSchema = new mongoose.Schema({
    title: String,
    topic: String,
    originDate: { type: Date, default: Date.now },
    content: String
});

const Post = mongoose.model("Post", postSchema);

const imageSchema = new mongoose.Schema({
    link: String,
    desc: String
});

const Image = mongoose.model("Image", imageSchema);


//------------------- ---- ------------------------//

//------------------- blog form input ------------------------//

app.get("/addBlog", function (req, res) {
    res.render("addBlog");
});

app.post("/addBlog", function (req, res) {
    const post = new Post({
        title: req.body.postTitle,
        topic: req.body.postTopic,
        content: req.body.postBody
    });
    post.save(function (err) {
        if (!err) {
            res.redirect("/");
        }
    });
});
//------------------------ ---- ------------------------------//

//------------------- backdoor-Dashboard ------------------------//

// app.get("/backdoor", function(req, res){

// });

//------------------------ ---- ------------------------------//
let success = false;
app.get("/", function (req, res) {
    res.render("home", {success});
});

app.post("/form", function (req, res) {
    console.log("chal gya")
    const post = new Post({
        title: req.body.your_name,
        content: req.body.phone,
        email: req.body.email,
        message: req.body.message
      });
    
    
    post.save(function(err){
        if (!err){
            success = true;
            res.redirect("/", {success});
        }
        else{
            console.log(err);
            res.redirect("/", {success});
        }
      });
});

app.get("/ourClinic", function (req, res) {
    res.render("ourClinic");
});

app.get("/ourDoctors", function (req, res) {
    res.render("ourDoctors");
});

app.get("/invisalign", function (req, res) {
    res.render("invisalign");
});

app.get("/implants", function (req, res) {
    res.render("implants");
});

app.get("/treatments", function (req, res) {
    res.render("treatments");
});

app.get("/blog", function (req, res) {
    // Post.find({}, function(err, posts){
        res.render("blog");
    //   });
});

app.get("/admin", function (req, res) {
    res.render("admin");
});

app.post("/admin", function (req, res) {
    const username = req.body.user_name;
    if(admin.hasOwnProperty(username)){
        bcrypt.compare(req.body.pass, admin[username], function (err, result) {
            // console.log({username, result});
            if(result){
                token = jwt.sign({
                    user_name: username
                }, process.env.JWT_KEY,
                {
                    expiresIn: "2h"
                });
                console.log(token);
                res.redirect("admin/backdoor");
            }
            else {
                console.log("wrong password");
                res.redirect("/admin");
            }
            
        });
    }
    else{
        console.log("Wrong username");
        res.redirect('/admin');
    }
});



app.get("/admin/backdoor",function(req,res){
    res.render("backdoor");
});

app.post("/admin/backdoor", function(req,res){

});

app.get("/admin/addblog", function(req,res){
    res.render("addBlog");
});

app.post("/admin/addblog", function(req,res){
    
});

app.get("/admin/addAlbum", function(req,res){
    res.render("addAlbum");
});

app.post("/admin/addAlbum", function(req,res){
    
});

console.log(token);            

app.listen(3000, function () {
    console.log("Server is running at port 3000.");
});
