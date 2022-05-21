import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "components/typography";
import useClasses from "hooks/useClasses";

const styles = (theme) => ({
  message: {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    width: "fit-content",
    marginBottom: theme.spacing(4),
  },
  audience: {
    background: "#eaeaea",
    color: theme.palette.dark,
  },
  user: {
    background: theme.palette.primary.main,
    color: theme.palette.background.default,
  },
});

const Body = () => {
  const classes = useClasses(styles);
  return (
    <Box boxShadow={1} mt={1}>
      <Grid item xs={12} bgcolor="white" padding={2} height="100%">
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={1} alignSelf="end">
              <Avatar />
            </Grid>
            <Grid item xs={11}>
              <div className={`${classes.message} ${classes.audience}`}>
                <Typography>Message Content</Typography>
                <Box textAlign={"right"} mt={1}>
                  <Typography variant="subtitle2">
                    <i>12:53 PM</i>
                  </Typography>
                </Box>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ direction: "rtl" }} my={3}>
          <Grid container>
            <Grid item xs={1} alignSelf="end">
              <Avatar />
            </Grid>
            <Grid item xs={11}>
              <div className={`${classes.message} ${classes.user}`}>
                <Typography>Message Content</Typography>
                <Box textAlign={"right"} mt={1}>
                  <Typography variant="subtitle2">
                    <i>12:53 PM</i>
                  </Typography>
                </Box>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Body;
