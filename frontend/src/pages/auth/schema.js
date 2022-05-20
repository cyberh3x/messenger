import * as yup from "yup";

export const signInSchema = yup.object().shape({
  username: yup.string().min(3).required(),
  password: yup.string().min(8).required(),
});

export const signUpSchema = yup.object().shape({
  username: yup.string().min(3).required(),
  password: yup.string().min(8).required(),
});
