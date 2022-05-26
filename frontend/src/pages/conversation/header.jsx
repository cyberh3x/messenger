import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Online from "components/flags/online";
import Typography from "components/typography";
import { useEffect, useState } from "react";

const Header = ({ socket }) => {
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on("typing:start", () => setIsTyping(true));
      socket.on("typing:stop", () => setIsTyping(false));
    }
  }, [socket]);

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
          <Box mr={1}>
            <Online />
          </Box>
          <Box mr={1}>
            <Avatar />
          </Box>
          <Typography variant="h4">
            Sajjad {isTyping ? "Typing..." : ""}
          </Typography>
        </Grid>
      </Link>
    </Grid>
  );
};

export default Header;
