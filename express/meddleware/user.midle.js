const jwt=require("jsonwebtoken");
const {userValidation,userLoginValidation,userUpdateValidation} = require("../validation/user.validation");

//register Middleware
const userValidate = (req, res, next)=> {
   try {
     const { error } = userValidation(req.body);
     if (error) {
       console.log(error);
       return res.status(400).json({ msg: error.details[0].message });
     }
    return next();
   } catch (error) {
     console.log(error.message);
   }
 };

//register Middleware
const userUpdateValidate = (req, res, next)=> {
   try {
     const { error } = userUpdateValidation(req.body);
     if (error) {
       console.log(error);
       return res.status(400).json({ msg: error.details[0].message });
     }
    return next();
   } catch (error) {
     console.log(error.message);
   }
 };

 //Login Middleware
const userLoginValidate = (req, res, next) => {
  try {
    const { error } = userLoginValidation(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ msg: error.details[0].message });
    }
    return next();
  } catch (error) {
    console.log(error.message);
  }
};


 module.exports = { userValidate, userLoginValidate,userUpdateValidate};
