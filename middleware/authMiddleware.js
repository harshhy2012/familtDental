require("dotenv").config();
const jwt = require("jsonwebtoken");
const Admin = require('../models/Admin.js');

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt;

    //check if jwt token exists and it is verified
    if(token){
         jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
             if(err){
                 console.log(err);
                 res.redirect('/admin');
             } else{
                 console.log(decodedToken);
                 next();
             }
         });
    }
    else{
        res.redirect('/admin');
    }
};

//check current user

// const checkUser = (req,res,next) => {
//     const token = req.cookies.jwt;
    
//     if(token){
//         jwt.verify(token, process.env.JWT_KEY , async (err, decodedToken) => {
//             if(err){
//                 res.locals.user = null;
//                 console.log(err);
//                 next();
//             } else{
//                 console.log(decodedToken);
//                 let user = await User.findById(decodedToken.id); 
//                 res.locals.user = user;
//                 next();
//             }
//         });
//     }
//     else{
//         res.locals.user = null;
//         next();
//     }
// };

module.exports = { requireAuth };