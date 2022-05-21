import { useState } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "components/button/iconButton";
import useClasses from "hooks/useClasses";
import Sidebar from "./sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "components/drawer";
import { Box } from "@mui/material";

const styles = (theme) => ({
  root: {
    height: "100%",
  },
  sidebar: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  mobileMenu: {
    display: "none",
    margin: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
});

const AppLayout = ({ children }) => {
  const classes = useClasses(styles);

  return (
    <Grid item xs={12} className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={6} md={4}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AppLayout;
