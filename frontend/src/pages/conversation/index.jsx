import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import useSocket from "hooks/useSocket";
import AppLayout from "pages/layouts/app";
import Body from "./body";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "components/typography";
import Online from "components/flags/online";

const Conversation = () => {
  const { id } = useParams(),
    { state } = useLocation(),
    { socket, storeRoom, contact } = useSocket(),
    getMessages = () =>
      socket.emit("get:room", { roomId: id, contactId: state }),
    onGetMessageList = () =>
      socket.on("room:ready", ({ room, contact }) => {
        storeRoom(room, contact);
      }),
    Sidebar = () => (
      <Grid item xs={12}>
        <Grid item xs={12} position="relative">
          <Avatar sx={{ width: 128, height: 128, mx: "auto" }} />
          {contact.status == 1 && (
            <Online
              style={{
                position: "absolute",
                right: 0,
                left: 0,
                margin: "0 auto",
                transform: "translate(40px, -19px)",
              }}
            />
          )}
        </Grid>
        <Grid container my={2}>
          <Grid item xs={12} md={6}>
            <Grid container alignItems={"center"} gap={1}>
              <Typography>Username: </Typography>
              <Typography variant="h6">
                <strong>{contact.username}</strong>
              </Typography>
            </Grid>
          </Grid>
          {contact.fistName && contact.lastName && (
            <Grid item xs={12} md={6}>
              <Grid container alignItems={"center"} gap={1}>
                <Typography>Full Name: </Typography>
                <Typography variant="h5">
                  <strong>
                    {contact.firstName} {contact.lastName}
                  </strong>
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    );

  useEffect(() => {
    if (socket) {
      getMessages();
      onGetMessageList();
    }
  }, [socket]);

  return (
    <AppLayout sidebar={<Sidebar />}>
      {socket ? (
        <>
          {/* <Header contact={contact} /> */}
          <Body />
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </AppLayout>
  );
};

export default Conversation;
