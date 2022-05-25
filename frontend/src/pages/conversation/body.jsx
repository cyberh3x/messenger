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
import SendIcon from "@mui/icons-material/Send";

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
      setTimeout(scrollToBottom, 100);
    },
    handleMessage = ({ target: { value } }) => setMessage(value),
    handleFileBrowser = () => fileInputRef.current.click(),
    scrollToBottom = () => {
      const topPos = rootRef.current.scrollHeight;
      rootRef.current.scrollTop = topPos;
    };

  useEffect(() => {
    if (socket) {
      socket.on("message:saved", ({ room }) => {
        console.log(room);
        updateConversations(room.conversations);
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
            }) => (
              <Grid
                item
                xs={12}
                style={{ direction: user._id == senderId ? "rtl" : "ltr" }}
                key={_id}
                my={3}
              >
                <Grid container>
                  <Grid item xs={1} alignSelf="end">
                    <Avatar />
                  </Grid>
                  <Grid item xs={11}>
                    <div
                      className={`${classes.message} ${
                        user._id === senderId ? classes.user : classes.audience
                      }`}
                    >
                      <Typography>{message}</Typography>
                      <Box textAlign={"right"} mt={1}>
                        <Typography variant="subtitle2">
                          <i>{createdAt.toString()}</i>
                        </Typography>
                      </Box>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            )
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
