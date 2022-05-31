import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Sidebar from "./sidebar";
import useClasses from "hooks/useClasses";
import { CONVERSATION } from "constants/routes";

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
      username: "Sajjad",
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
      username: "Ali",
      isOnline: true,
      text: "Hello Ali",
      href: CONVERSATION.replace(":id", 2),
    },
  ];

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
                {sidebar && (
                  <Box bgcolor={"white"} borderRadius={3} boxShadow={1} p={2}>
                    {sidebar}
                  </Box>
                )}
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
