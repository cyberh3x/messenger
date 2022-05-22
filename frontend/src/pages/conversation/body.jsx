import useClasses from "hooks/useClasses";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "components/typography";
import AttachmentIcon from "@mui/icons-material/Attachment";
import IconButton from "components/button/iconButton";
import SendIcon from "@mui/icons-material/Send";
import { useRef } from "react";

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
  inputContainer: {
    position: "absolute",
    bottom: theme.spacing(2),
    background: theme.palette.gray.main,
    borderRadius: "50px",
    width: "95%",
    height: theme.spacing(5),
    "& input": {
      border: 0,
      background: "transparent",
      width: "85%",
      [theme.breakpoints.down("sm")]: {
        width: "65%",
      },
    },
    "& input:focus": {
      outlineWidth: 0,
    },
  },
});

const Body = () => {
  const classes = useClasses(styles),
    fileInputRef = useRef(null),
    handleSendMessage = (e) => {
      e.preventDefault();
      console.log("Send Message...");
    },
    handleFileBrowser = () => fileInputRef.current.click();
  return (
    <Grid
      item
      xs={12}
      bgcolor="white"
      padding={2}
      height="100%"
      mt={1}
      borderRadius={3}
      boxShadow={1}
      position="relative"
    >
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
              <Box textAlign={"right"} mt={1} style={{ direction: "ltr" }}>
                <Typography variant="subtitle2">
                  <i>12:53 PM</i>
                </Typography>
              </Box>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <form onSubmit={handleSendMessage}>
        <Grid
          item
          xs={12}
          className={classes.inputContainer}
          bgcolor="whitesmoke"
        >
          <Grid container alignItems="baseline">
            <Box mr={1}>
              <Grid item xs={1}>
                <IconButton onClick={handleFileBrowser}>
                  <AttachmentIcon />
                </IconButton>
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                />
              </Grid>
            </Box>
            <input type="text" placeholder="Type your message..." />
            <Box
              boxShadow={1}
              position="absolute"
              right={1}
              top={-8}
              bgcolor="primary.main"
              borderRadius="50px"
            >
              <IconButton type="submit">
                <SendIcon fontSize="large" style={{ color: "#fff" }} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default Body;
