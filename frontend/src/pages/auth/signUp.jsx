import { useState } from "react";
import useClasses from "hooks/useClasses";
import useUser from "hooks/useUser";
import Grid from "@mui/material/Grid";
import Button from "components/button";
import TextField from "components/form/textField";
import { signUpSchema } from "./schema";
import AlertBox from "components/alert";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { SIGN_IN } from "constants/routes";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  cover: {
    background: "url(assets/images/signUp.jpg) center center no-repeat fixed",
    height: "100vh",
    borderRadius: theme.spacing(0, 3, 3, 0),
  },
  icon: {
    border: "2px solid black",
    borderRadius: "50px",
    padding: theme.spacing(2),
    verticalAlign: "middle",
  },
});

const SignUp = () => {
  const classes = useClasses(styles),
    { register, pending } = useUser(),
    [username, setUsername] = useState(""),
    [password, setPassword] = useState(""),
    [errors, setErrors] = useState({}),
    handleRegister = async (e) => {
      e.preventDefault();
      setErrors({});
      const credentials = { username, password };
      await signUpSchema
        .validate(credentials, { abortEarly: false })
        .then(
          async (e) =>
            await register(e).catch(({ response: { data } }) => setErrors(data))
        )
        .catch((errors) => setErrors(errors));
    },
    handleUsername = ({ target: { value } }) => setUsername(value),
    handlePassword = ({ target: { value } }) => setPassword(value);
  return (
    <Grid container>
      <Grid item xs={12} sm={6} md={7} lg={8} className={classes.cover}></Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={5}
        lg={4}
        className={classes.form}
        padding={5}
        alignSelf={"center"}
      >
        <Grid item xs={12} mb={3} textAlign="center">
          <PersonAddAltIcon fontSize="large" className={classes.icon} />
        </Grid>
        <form onSubmit={handleRegister}>
          <Grid item xs={12} mb={3}>
            <TextField
              id="username"
              name="username"
              label="Username"
              value={username}
              onChange={handleUsername}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              id="password"
              name="password"
              label="Password"
              value={password}
              onChange={handlePassword}
              required
            />
          </Grid>
          {Object.keys(errors).length > 0 && (
            <Grid item xs={12} my={3}>
              <AlertBox items={errors.errors} title={errors.message} />
            </Grid>
          )}

          <Grid item xs={12} mt={3}>
            <Grid container>
              <Grid item xs={6} justifyContent="center">
                <Link to={SIGN_IN}>Sign in</Link>
              </Grid>
              <Grid item xs={6} textAlign={"right"}>
                <Button type="submit" disabled={pending}>
                  Sign up
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default SignUp;
