import { useState } from "react";
import { Link } from "react-router-dom";
import { useMessenger } from "context/messenger/messengerProvider";
import useClasses from "hooks/useClasses";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/system/Box";
import SidebarTabs from "./tabs";
import IconButton from "components/button/iconButton";
import { HOME } from "constants/routes";
import { CHANGE_TAB } from "constants/actionsTypes";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Menu from "components/menu";

const styles = (theme) => ({
  root: {
    background: theme.palette.primary.main,
    borderRadius: theme.spacing(0, 3, 3, 0),
    position: "fixed",
    transition: `${theme.transitions.easing.sharp} ${theme.transitions.duration.complex}s`,
    height: "100%",
    zIndex: 1,
  },
  sidebarDrawerHandler: {
    position: "absolute !important",
    right: 0,
    top: "50%",
    background: "#fff !important",
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  },
  avatar: {
    margin: theme.spacing(3, "auto"),
  },
});

const Sidebar = ({}) => {
  const classes = useClasses(styles),
    [sidebarIsOpen, setSidebarIsOpen] = useState(true),
    [{ tab }, dispatch] = useMessenger(),
    handleChange = (event, newValue) =>
      dispatch({ type: CHANGE_TAB, payload: newValue }),
    handleSidebar = () => setSidebarIsOpen(!sidebarIsOpen);
  return (
    <div className={classes.root}>
      {sidebarIsOpen ? (
        <div>
          <Grid item xs={12}>
            <Link to={HOME}>
              <Avatar className={classes.avatar} />
            </Link>
          </Grid>
          <Box my={3}>
            <hr />
          </Box>
          <SidebarTabs handleChange={handleChange} tab={tab} />
        </div>
      ) : (
        <></>
      )}
      <IconButton
        className={classes.sidebarDrawerHandler}
        onClick={handleSidebar}
        style={
          sidebarIsOpen
            ? { transform: "translate(20px, -50%)" }
            : { transform: "translate(50px, -50%)" }
        }
      >
        {sidebarIsOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </div>
  );
};

export default Sidebar;
