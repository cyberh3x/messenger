const yup = require("yup");

const registerSchema = yup.object().shape({
  username: yup.string().min(3).required(),
  password: yup.string().min(8).required(),
});

module.exports = registerSchema;
