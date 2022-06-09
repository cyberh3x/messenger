import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "components/box/index";
import Sidebar from "./sidebar";
import useClasses from "hooks/useClasses";

const styles = (theme) => ({
  root: {
    height: "100%",
  },
  sidebarContainer: {
    height: "100%",
    background: theme.palette.primary.main,
    position: "fixed",
    [theme.breakpoints.down("md")]: {
      width: 0,
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

const AppLayout = ({ children, sidebar }) => {
  const classes = useClasses(styles);

  return (
    <Grid item xs={12} className={classes.root}>
      <Grid container>
        <Sidebar />
        <Grid item xs={11} py={2} mx="auto">
          <Container maxWidth="xl">
            <Grid container spacing={3} px={3}>
              <Grid item xs={12} md={4}>
                {sidebar && <Box>{sidebar}</Box>}
              </Grid>
              <Grid item xs={12} md={sidebar ? 8 : 12}>
                {children}
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AppLayout;
