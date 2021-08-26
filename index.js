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
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//------------------- bcrypt passwords ------------------------//

let admin = { mahima: "", tushita: "" };
const pws = process.env.pw.split(",");

bcrypt.hash(pws[0], parseInt(process.env.SALT_ROUNDS), function (err, hash) {
  admin.mahima = hash;
});

bcrypt.hash(pws[1], process.env.SALT_ROUNDS, function (err, hash) {
  admin.tushita = hash;
});

//------------------- ---------------- ------------------------//

//------------------- blog ------------------------//

mongoose.connect(
  "mongodb+srv://harshhy2012:" +
    process.env.db_pw +
    "@cluster0.kujzt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  message: String,
});

const User = mongoose.model("User", userSchema);

const blogpostSchema = new mongoose.Schema({
  title: String,
  topic: String,
  originDate: { type: Date, default: Date.now },
  content: String,
});

const Blogpost = mongoose.model("Blogpost", blogpostSchema);

const imageSchema = new mongoose.Schema({
  link: String,
  desc: String,
});

const Image = mongoose.model("Image", imageSchema);

//------------------- ---- ------------------------//

//------------------- blog form input ------------------------//

app.get("/addBlog", function (req, res) {
  res.render("addBlog");
});

app.post("/addBlog", function (req, res) {
  const blogpost = new Blogpost({
    title: req.body.postTitle,
    topic: req.body.postTopic,
    content: req.body.postBody,
  });
  blogpost.save(function (err) {
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
let success = '';
app.get("/", function (req, res) {
  res.render("home", { success });
});

app.post("/", function (req, res) {
  console.log("chal gya");
  const user = new User({
    name: req.body.userName,
    phone: req.body.phoneNumber,
    email: req.body.emailID,
    message: req.body.message
  });

  user.save(function (err) {
    if (!err) {
      success = "success";
      res.redirect("/");
    } else {
      success='error';
      console.log(err);
      res.redirect("/");
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

const checkToken = (req, res, next) => {
  const header = req.headers['authorization'];

  if(typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1];
      req.token = token;
      next();
  } else {
      //If header is undefined return Forbidden (403)
      res.sendStatus(403)
  }
}

app.post("/admin", function (req, res) {
  const username = req.body.user_name.trim();
  if (admin.hasOwnProperty(username)) {
    bcrypt.compare(req.body.pass, admin[username], function (err, result) {
      // console.log({username, result});
      if (result) {
        token = jwt.sign(
          {
            user_name: username,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "24h",
          }
        );
        console.log(token);
        res.redirect("admin/backdoor");
      } else {
        console.log("wrong username or password");
        res.redirect("/admin");
      }
    });
  } else {
    console.log("Wrong username");
    res.redirect("/admin");
  }
});


app.get("/admin/backdoor", checkToken, (req,res) => {
  jwt.verify(req.token, process.env.JWT_KEY, (err, authorizedData) => {
    if(err){
      console.log(err);
        //If error send Forbidden (403)
        console.log('ERROR: Could not connect to the protected route');
        res.sendStatus(403);
    } else {
        //If token is successfully verified, we can send the autorized data 
        res.json({
            message: 'Successful log in',
            authorizedData
        });
        console.log('SUCCESS: Connected to protected route');
        res.render("backdoor");
    }
  });
  
});

app.post("/admin/backdoor", function (req, res) {});

app.get("/admin/addblog", function (req, res) {
  res.render("addBlog");
});

app.post("/admin/addblog", function (req, res) {});

app.get("/admin/addAlbum", function (req, res) {
  res.render("addAlbum");
});

app.post("/admin/addAlbum", function (req, res) {});

app.get("/admin/logout", function(req,res){
  token = '';
  console.log(token);
  res.redirect('/admin');
});

console.log(token);




app.listen(3000, function () {
  console.log("Server is running at port 3000.");
});
