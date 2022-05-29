import { Fragment, useEffect, useRef, useState } from "react";
import useClasses from "hooks/useClasses";
import useSocket from "hooks/useSocket";
import useUser from "hooks/useUser";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "components/typography";
import dayjs from "dayjs";

const styles = (theme) => ({
  root: {
    overflowY: "auto",
  },
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
    borderRadius: "50px",
    height: theme.spacing(5),
    "& input": {
      border: 0,
      background: "transparent",
      width: "85%",
      height: "100%",
      margin: theme.spacing(0, 2),
      [theme.breakpoints.down("sm")]: {
        width: "65%",
      },
    },
    "& input:focus": {
      outlineWidth: 0,
    },
    "& input::placeholder": {
      alignSelf: "center",
    },
  },
  content: {
    height: "100%",
  },
});

const Body = () => {
  const classes = useClasses(styles),
    [message, setMessage] = useState(""),
    { room, updateConversations, socket } = useSocket(),
    { conversations } = room,
    { user } = useUser(),
    rootRef = useRef(null),
    fileInputRef = useRef(null),
    messageInputRef = useRef(null),
    handleSendMessage = (e) => {
      e.preventDefault();
      socket.emit("new:message", {
        room,
        message,
        user,
      });
      setMessage("");
    },
    handleMessage = ({ target: { value } }) => setMessage(value),
    handleFileBrowser = () => fileInputRef.current.click(),
    scrollToBottom = (withTimeout = true, timeout = 100) => {
      withTimeout ? setTimeout(scroll, timeout) : scroll();
      function scroll() {
        const topPos = rootRef.current.scrollHeight;
        rootRef.current.scrollTop = topPos;
      }
    };

  useEffect(() => {
    scrollToBottom(false);
  }, [conversations]);

  return (
    <>
      <Grid
        item
        xs={12}
        bgcolor="white"
        padding={2}
        height="500px"
        borderRadius={3}
        boxShadow={1}
        position="relative"
        className={classes.root}
        ref={rootRef}
      >
        <div className={classes.content}>
          {conversations ? (
            <Fragment>
              {conversations.map(
                ({ _id, senderId, message, replyTo, createdAt }) => {
                  let date = dayjs(createdAt).format("YYYY-MM-DD | H:m:s");
                  return (
                    <Grid
                      item
                      xs={12}
                      style={{
                        direction: user._id == senderId ? "rtl" : "ltr",
                      }}
                      my={3}
                      py={1}
                      key={_id}
                      id={_id}
                    >
                      <Grid container>
                        <Grid item xs={1} alignSelf="end">
                          <Avatar />
                        </Grid>
                        <Grid item xs={11}>
                          <div
                            className={`${classes.message} ${
                              user._id === senderId
                                ? classes.user
                                : classes.audience
                            }`}
                          >
                            <Typography dir="ltr">{message}</Typography>
                            <Box textAlign={"right"} mt={1}>
                              <Typography variant="subtitle2" dir="ltr">
                                <i>{date}</i>
                              </Typography>
                            </Box>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                }
              )}
            </Fragment>
          ) : (
            <></>
          )}
        </div>
      </Grid>
      <form onSubmit={handleSendMessage}>
        <Grid
          item
          xs={12}
          className={classes.inputContainer}
          bgcolor="white"
          mx={"auto"}
          my={2}
          boxShadow={1}
        >
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={handleMessage}
            ref={messageInputRef}
          />
        </Grid>
      </form>
    </>
  );
};

export default Body;
