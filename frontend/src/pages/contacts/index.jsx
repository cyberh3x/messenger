import { useEffect } from "react";
import useSocket from "hooks/useSocket";
import Grid from "@mui/material/Grid";
import Button from "components/button";
import Typography from "components/typography";
import List from "components/list";
import AddContact from "./add";
import AppLayout from "pages/layouts/app";
import CircularProgress from "components/progress/circular";
import RemoveContact from "./remove";
import ImageBox from "components/box/imageBox";

const Contacts = () => {
  const { getContacts, handleToggleAddContactDialog, pending, contacts } =
      useSocket(),
    Sidebar = () => (
      <Grid item xs={12}>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography variant="h5">Contacts</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Button color="primary" onClick={handleToggleAddContactDialog}>
              Add
            </Button>
          </Grid>
        </Grid>
        <hr />
        {pending ? (
          <CircularProgress />
        ) : (
          <Grid item xs={12}>
            {contacts.length ? (
              <List items={contacts} />
            ) : (
              <Typography>No contacts found.</Typography>
            )}
          </Grid>
        )}
        <AddContact />
        <RemoveContact />
      </Grid>
    );

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <AppLayout sidebar={<Sidebar />}>
      <ImageBox
        image="/assets/images/contacts.svg"
        imageProps={{ alt: "Contacts", title: "Contacts" }}
      />
    </AppLayout>
  );
};

export default Contacts;
