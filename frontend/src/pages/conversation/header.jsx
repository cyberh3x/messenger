import { Link, useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Online from "components/flags/online";
import Typography from "components/typography";
import useUser from "hooks/useUser";
import { useEffect, useState } from "react";

const Header = () => {
  const { state: contactId } = useLocation(),
    [contact, setContact] = useState({}),
    { contacts } = useUser();

  useEffect(() => {
    const contactIndex = contacts.findIndex(
      (contact) => contact._id == contactId
    );
    setContact(contacts[contactIndex]);
  }, []);

  return (
    <Grid
      item
      xs={12}
      bgcolor="white"
      padding={2}
      borderRadius={3}
      boxShadow={1}
    >
      <Link to={"#"}>
        <Grid item xs={12} display="inline-flex" alignItems={"center"}>
          <Box mr={1}>{contact?.status === 1 ? <Online /> : <></>}</Box>
          <Box mr={1}>
            <Avatar />
          </Box>
          <Typography variant="h4">{contact?.username}</Typography>
        </Grid>
      </Link>
    </Grid>
  );
};

export default Header;
