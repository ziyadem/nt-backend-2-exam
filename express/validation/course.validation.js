const Joi = require("joi");

//cours validate
const courseValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(20).required(),
    price: Joi.number().min(3).required(),
    author: Joi.string().min(3).max(30).required(),
  });

  return schema.validate(data);
};

//update
const updateCourseValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(20),
    price: Joi.number().min(3),
    author: Joi.string().min(3).max(30),
  });

  return schema.validate(data);
};

module.exports = { courseValidation, updateCourseValidation };
