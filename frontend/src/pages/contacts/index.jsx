import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "components/button";
import Typography from "components/typography";
import List from "components/list";
import AddContact from "./add";
import AppLayout from "pages/layouts/app";
import useUser from "hooks/useUser";

const Contacts = () => {
  const { getContacts, handleToggleAddDialog, pending, contacts } = useUser(),
    Sidebar = () => (
      <Grid item xs={12}>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography variant="h5">Contacts</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Button color="primary" onClick={handleToggleAddDialog}>
              Add
            </Button>
          </Grid>
        </Grid>
        <hr />
        {pending ? (
          <Typography>Lading contacts...</Typography>
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
      </Grid>
    );

  useEffect(() => {
    getContacts();
  }, []);

  return <AppLayout sidebar={<Sidebar />}></AppLayout>;
};

export default Contacts;
