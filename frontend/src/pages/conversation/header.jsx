import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Online from "components/flags/online";
import Typography from "components/typography";

const Header = () => {
  return (
    <Box boxShadow={1}>
      <Grid item xs={12} bgcolor="white" padding={2}>
        <Grid item xs={12} display="inline-flex" alignItems={"center"}>
          <Box mr={1}>
            <Online />
          </Box>
          <Typography variant="h4">Sajjad</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
