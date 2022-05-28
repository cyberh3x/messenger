import React from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "components/typography";
import ListItemButton from "@mui/material/ListItemButton";
import useClasses from "hooks/useClasses";
import Grid from "@mui/material/Grid";
import Menu from "components/menu";
import Online from "components/flags/online";

const styles = (theme) => ({
  listItem: {},
});

const Item = ({
  id,
  username,
  text = "",
  avatar = null,
  status = 0,
  menu = [],
  href = "",
}) => {
  const classes = useClasses(styles);
  return (
    <Grid item xs={12} key={id}>
      <Link to={href.url} state={href.state}>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "transparent",
            maxWidth: "none",
          }}
        >
          <Grid container>
            <ListItemButton alignItems="flex-start">
              <Grid item xs={2} sm={5} md={2}>
                <ListItemAvatar style={{ position: "relative" }}>
                  <Avatar alt={username} src={avatar} />
                  {status == 1 && (
                    <Online style={{ transform: "translate(30px, -12px)" }} />
                  )}
                </ListItemAvatar>
              </Grid>
              <Grid item xs={10} sm={7} md={10}>
                <Grid container>
                  <Grid item xs={10}>
                    <ListItemText
                      className={classes.listItem}
                      primary={
                        <React.Fragment>
                          <Typography component="span" variant="body2">
                            {username}
                          </Typography>
                        </React.Fragment>
                      }
                      secondary={
                        <Typography
                          component="span"
                          variant="body2"
                          color="gray"
                        >
                          {text}
                        </Typography>
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </ListItemButton>
            {menu.length > 0 && (
              <Grid item xs={2} textAlign="right" alignSelf={"center"}>
                <Menu items={menu} />
              </Grid>
            )}
          </Grid>
        </List>
      </Link>
    </Grid>
  );
};
export default Item;
