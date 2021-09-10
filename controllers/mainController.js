const User = require("../models/User");

const handleMainErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {name: '', email: '', phone: ''};

  //duplicate error
  if(err.message === 'Please enter a name'){
      errors.email = 'Name cannot be empty';
      return errors;
  }

  if(err.message === 'Incorrect email!'){
      errors.email = 'that email is not valid';
      return errors;
  }
  if(err.message === 'Incorrect phone number!'){
      errors.password = 'that phone number is not valid';
      return errors;
  }
  
  return errors;
};

module.exports.landingPage_get = (req,res) => {
    res.render("home");
};

module.exports.landingPage_post = async (req,res) => {
    console.log("chal gya");
    const {name, phone, email, message} = req.body;
    try{
        const user = await User.create({name, phone, email, message});
        res.status(201).json({user: user._id});
        
      }
      catch(err){
        console.log(err);
        res.status(400).json({errors});
      }
};

module.exports.ourClinic_get = (req,res) =>{
    res.render('ourClinic');
};

module.exports.ourDoctors_get = (req,res) =>{
    res.render('ourDoctors');
};
module.exports.invisalign_get = (req,res) =>{
    res.render('invisalign');
}; 
module.exports.implants_get = (req,res) =>{
    res.render('implants');
}; 
module.exports.treatments_get = (req,res) =>{
    res.render('treatments');
};

module.exports.blog_get = (req,res) => {
    res.render('blog');
};
