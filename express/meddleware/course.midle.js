const jwt = require("jsonwebtoken");
const { courseValidation,updateCourseValidation } = require("../validation/course.validation");

//course Middleware
const courseValidate = (req, res, next) => {
  try {
    const { error } = courseValidation(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ msg: error.details[0].message });
    }
    return next();
  } catch (error) {
    console.log(error.message);
  }
};

//update Middleware
const updateCourseValidate = (req, res, next) => {
  try {
    const { error } = updateCourseValidation(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    return next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { courseValidate,updateCourseValidate };
