require("dotenv").config();
const bcrypt = require("bcrypt");

const Admin = { mahima: "", tushita: "" };
const pws = process.env.pw.split(",");

bcrypt.hash(pws[0], parseInt(process.env.SALT_ROUNDS), function (err, hash) {
  Admin.mahima = hash;
});

bcrypt.hash(pws[1], process.env.SALT_ROUNDS, function (err, hash) {
  Admin.tushita = hash;
});

const loginAdmin = async (username, password) => {
  if (Admin.hasOwnProperty(username)) {
    const auth = await bcrypt.compare(password, Admin[username]);
    if(auth){
      console.log("User and password correct!");
      return {username};
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect username");
};

module.exports = {Admin, loginAdmin};

