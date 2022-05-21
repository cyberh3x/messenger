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

const styles = (theme) => ({
  onlineFlag: {
    width: theme.spacing(1),
    height: theme.spacing(1),
    background: theme.palette.success.main,
    borderRadius: "50%",
    border: "2px solid white",
    display: "block",
    transform: "translate(30px, -12px)",
  },
  listItem: {
    margin: theme.spacing(0, 2),
  },
});

const Item = ({
  id,
  name,
  text = "",
  avatar = null,
  isOnline = false,
  menu = [],
  href = "",
}) => {
  const classes = useClasses(styles);
  return (
    <Grid item xs={12}>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "transparent",
          maxWidth: "none",
        }}
        key={id}
      >
        <Link to={href}>
          <Grid container>
            <ListItemButton alignItems="flex-start">
              <Grid item xs={2} sm={5} md={2}>
                <ListItemAvatar style={{ position: "relative" }}>
                  <div>
                    <Avatar alt={name} src={avatar} />
                    {isOnline && <span className={classes.onlineFlag}></span>}
                  </div>
                </ListItemAvatar>
              </Grid>
              <Grid item xs={10} sm={7} md={10}>
                <Grid container>
                  <Grid item xs={10}>
                    <ListItemText
                      className={classes.listItem}
                      primary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="white"
                          >
                            {name}
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
                  {menu.length > 0 && (
                    <Grid item xs={2} textAlign="right">
                      <Menu items={menu} />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </ListItemButton>
          </Grid>
        </Link>
      </List>
    </Grid>
  );
};
export default Item;
