require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
// const session = require("express-session");
// const passport = require("passport");

const app = express()

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.createConnection("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.createConnection("mongodb://localhost:27017/adminDB", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

app.get("/", function(req, res){
    res.render("home", {MAP_KEY: process.env.MAP_KEY});
});

app.get("/home", function(req, res){
    res.render("home", {MAP_KEY: process.env.MAP_KEY});
});

app.get("/ourClinic", function(req,res){
    res.render("ourClinic", {MAP_KEY: process.env.MAP_KEY});
});

app.get("/ourDoctors", function(req,res){
    res.render("ourDoctors", {MAP_KEY: process.env.MAP_KEY});
});

app.get("/implants", function(req,res){
    res.render("implants", {MAP_KEY: process.env.MAP_KEY});
});

app.get("/admin", function(req,res){
    res.render("admin");
});

app.get("/blog", function(req,res){
    res.render("blog");
});



app.get("/backdoor", function(req,res){
    res.render("backdoor");
});


app.post("/admin", function(req,res){

});

app.get("/login", function(req,res){
    res.render("login");
});

app.listen(3000, function(){
    console.log("Server is running at port 3000.")
});
