import React from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "components/typography";
import ListItemButton from "@mui/material/ListItemButton";
import Grid from "@mui/material/Grid";
import Menu from "components/menu";
import Online from "components/flags/online";

const Item = ({
  id,
  username,
  text = "",
  avatar = null,
  status = 0,
  menu = () => {},
  href = "",
}) => {
  const items = menu();
  return (
    <Grid item xs={12} key={id}>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "transparent",
          maxWidth: "none",
        }}
      >
        <Grid container>
          <Grid item xs={8}>
            <Link to={href.url} state={href.state}>
              <ListItemButton alignItems="flex-start">
                <ListItemAvatar style={{ position: "relative" }}>
                  <Avatar alt={username} src={avatar} />
                  {status == 1 && (
                    <Online style={{ transform: "translate(30px, -12px)" }} />
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography component="span" variant="body2">
                        {username}
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <Typography component="span" variant="body2" color="gray">
                      {text}
                    </Typography>
                  }
                />
              </ListItemButton>
            </Link>
          </Grid>
          <Grid item xs={4} textAlign="right" alignSelf="center">
            {items.length > 0 && <Menu items={items} />}
          </Grid>
        </Grid>
      </List>
    </Grid>
  );
};
export default Item;
