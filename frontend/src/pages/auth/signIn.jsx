import { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "components/button";
import TextField from "components/form/textField";
import useClasses from "hooks/useClasses";
import LoginIcon from "@mui/icons-material/Login";
import useUser from "hooks/useUser";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HOME } from "constants/routes";
import { setCookie } from "utils/cookie";
import { TOKEN_KEY } from "constants";

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
    { login } = useUser(),
    [username, setUsername] = useState(""),
    [password, setPassword] = useState(""),
    [errors, setErrors] = useState({}),
    navigate = useNavigate(),
    handleLogin = async () => {
      setErrors({});
      await login({ username, password }).catch(({ response: { data } }) =>
        setErrors(data)
      );
    },
    handleUsername = ({ target: { value } }) => setUsername(value),
    handlePassword = ({ target: { value } }) => setPassword(value);
  return (
    <Grid container>
      <Grid item xs={12} md={8} className={classes.cover}></Grid>
      <Grid
        item
        xs={12}
        md={4}
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
          />
        </Grid>
        {Object.keys(errors).length > 0 && (
          <Grid item xs={12} my={3} textAlign={"right"}>
            <Alert severity="error">{errors.message}</Alert>
          </Grid>
        )}

        <Grid item xs={12} mt={3} textAlign={"right"}>
          <Button onClick={handleLogin}>Sign in</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignIn;
