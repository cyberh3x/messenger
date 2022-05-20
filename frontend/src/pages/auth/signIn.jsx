import { useState } from "react";
import useUser from "hooks/useUser";
import Grid from "@mui/material/Grid";
import Button from "components/button";
import TextField from "components/form/textField";
import LoginIcon from "@mui/icons-material/Login";
import AlertBox from "components/alert";
import useClasses from "hooks/useClasses";
import { signInSchema } from "./schema";
import { Link } from "react-router-dom";
import { SIGN_UP } from "constants/routes";

const styles = (theme) => ({
  cover: {
    background: "url(assets/images/signIn.jpg) center center no-repeat fixed",
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

const SignIn = () => {
  const classes = useClasses(styles),
    { login, pending } = useUser(),
    [username, setUsername] = useState(""),
    [password, setPassword] = useState(""),
    [errors, setErrors] = useState({}),
    handleLogin = async () => {
      setErrors({});
      const credentials = { username, password };
      await signInSchema
        .validate(credentials, { abortEarly: false })
        .then(
          async (e) =>
            await login(e).catch(({ response: { data } }) => setErrors(data))
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
          <LoginIcon fontSize="large" className={classes.icon} />
        </Grid>
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
              <Link to={SIGN_UP}>Register</Link>
            </Grid>
            <Grid item xs={6} textAlign={"right"}>
              <Button onClick={handleLogin} disabled={pending}>
                Sign in
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignIn;
