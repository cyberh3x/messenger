import * as yup from "yup";

export const addSchema = yup.object().shape({
  username: yup.string().min(3).required(),
});
