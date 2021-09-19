/* jshint esversion: 8 */
require("dotenv").config();
const jwt = require('jsonwebtoken');
const { Admin, loginAdmin } = require("../models/Admin");

const handleAuthErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: '', password: '' };

  console.log(err.message);

  if (err.message === 'Incorrect username') {
    errors.username = 'that username is incorrect';
    return errors;
  }
  if (err.message === 'Incorrect password') {
    errors.password = 'that password is incorrect';
    return errors;
  }


  if (err.message.includes('user validation failed')) {
    console.log("\n\nbefore: ");

    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
      console.log("\n\nafter: ");
      console.log(errors[properties]);
    });
  }
  return errors;
};

const maxAge = 3 * 60 * 60;
const createToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_KEY, {
    expiresIn: maxAge
  });
};

module.exports.admin_get = (req, res) => {
  const token = req.cookies.jwt;
  if(!token)
    res.render("admin");
  //check if jwt token exists and it is verifd
  else {
    jwt.verify(token, process.env.JWT_KEY, (err) => {
      if (err) {
        console.log(err);
        res.render('admin');
      } else {
        res.redirect('/admin/backdoor');
      }
    });
  }
};

module.exports.admin_post = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await loginAdmin(username, password);
    const token = createToken(user.username);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user });
  }
  catch (err) {
    const errors = handleAuthErrors(err);
    res.status(400).json({ errors });
  }
};