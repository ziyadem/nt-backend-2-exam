const Joi =require("joi")

//user validate
const userValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(10).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    email: Joi.string().min(3).max(30).required().email(),
    confirmEmail: Joi.string().min(3).max(30).required().email(),
  });

  return schema.validate(data);
};

//update validate
const userUpdateValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(10),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    email: Joi.string().min(3).max(30).email(),
  });

  return schema.validate(data);
};

//login validate
const userLoginValidation = (data) => {
  const schema = Joi.object({
    supername: Joi.string().min(3).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  return schema.validate(data);
};

module.exports = { userValidation, userLoginValidation, userUpdateValidation };
