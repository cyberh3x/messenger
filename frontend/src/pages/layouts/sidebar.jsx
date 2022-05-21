import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "components/typography";
import useClasses from "hooks/useClasses";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "components/button/iconButton";
import Tooltip from "@mui/material/Tooltip";
import SidebarTabs from "./tabs";
import List from "components/list";
import Menu from "components/menu";
import { CONVERSATION, HOME } from "constants/routes";

const styles = (theme) => ({
  root: {
    background: theme.palette.primary.main,
    height: "100vh",
    padding: theme.spacing(3),
  },
});

const menuItems = [
    {
      id: 1,
      label: "Profile",
      props: {
        onClick: () => console.log("Profile"),
      },
    },
    {
      id: 2,
      label: "Logout",
      props: {
        onClick: () => console.log("Logout"),
      },
    },
  ],
  conversations = [
    {
      id: 1,
      name: "Sajjad",
      isOnline: false,
      text: "Hello Sajjad",
      menu: [
        {
          id: 1,
          label: "Delete Conversation",
          props: {
            onClick: () => console.log("Delete Conversation"),
          },
        },
      ],
      href: CONVERSATION.replace(":id", 1),
    },
    {
      id: 2,
      name: "Ali",
      isOnline: true,
      text: "Hello Ali",
      href: CONVERSATION.replace(":id", 2),
    },
  ];

const Sidebar = () => {
  const classes = useClasses(styles),
    [tab, setTab] = useState(0),
    handleChange = (event, newValue) => {
      setTab(newValue);
    };

  return (
    <Grid item xs={12} className={classes.root}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Link to={HOME}>
            <Typography variant="h6" color="white">
              <strong>UFO Messenger</strong>
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container justifyContent={"end"}>
            <IconButton color="default">
              <Tooltip title="Add contact">
                <AddIcon style={{ color: "#fff" }} />
              </Tooltip>
            </IconButton>
            <Menu items={menuItems} />
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"}>
        <SidebarTabs handleChange={handleChange} tab={tab} />
      </Grid>
      <hr />
      {tab == 0 && <List items={conversations} />}
      {tab == 1 && <h1>Groups</h1>}
      {tab == 2 && <h1>Contacts</h1>}
    </Grid>
  );
};

export default Sidebar;
