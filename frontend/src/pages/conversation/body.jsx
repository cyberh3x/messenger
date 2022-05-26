import { Fragment, useEffect, useRef, useState } from "react";
import useClasses from "hooks/useClasses";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "components/typography";
import AttachmentIcon from "@mui/icons-material/Attachment";
import IconButton from "components/button/iconButton";
import useRoom from "hooks/useConversations";
import useUser from "hooks/useUser";

const styles = (theme) => ({
  root: {
    overflowY: "scroll",
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

const Body = ({ socket }) => {
  let typingTimeout = null;
  const classes = useClasses(styles),
    [message, setMessage] = useState(""),
    { room, updateConversations } = useRoom(),
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
      scrollToBottom();
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
    if (socket) {
      socket.on("message:saved", ({ room }) => {
        updateConversations(room.conversations);
        scrollToBottom();
      });
    }
  }, [socket]);

  useEffect(() => {
    setTimeout(scrollToBottom, 500);
  }, []);

  return (
    <Grid
      item
      xs={12}
      bgcolor="white"
      padding={2}
      height="500px"
      mt={1}
      borderRadius={3}
      boxShadow={1}
      position="relative"
      className={classes.root}
      ref={rootRef}
    >
      {conversations ? (
        <Fragment>
          {conversations.map(
            ({
              _id,
              senderId,
              receiverId,
              message,
              replyTo,
              status,
              createdAt,
              updatedAt,
            }) => {
              let date = new Date(createdAt);
              const year = date.getFullYear(),
                month = date.getMonth(),
                day = date.getDay(),
                hour = date.getHours(),
                minutes = date.getMinutes(),
                seconds = date.getSeconds(),
                displayDate = `${year}-${month <= 9 ? month : "0" + month}-${
                  day <= 9 ? day : "0" + day
                } | ${hour}:${minutes}:${seconds}`;
              return (
                <Grid
                  item
                  xs={12}
                  style={{ direction: user._id == senderId ? "rtl" : "ltr" }}
                  my={3}
                  key={_id}
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
                            <i>{displayDate}</i>
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
      <form onSubmit={handleSendMessage}>
        <Grid
          item
          xs={12}
          className={classes.inputContainer}
          bgcolor="whitesmoke"
          mx={"auto"}
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
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={handleMessage}
              ref={messageInputRef}
            />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default Body;
