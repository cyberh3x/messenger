import { Grid } from "@mui/material";

const AppLayout = () => {
  return (
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={8}></Grid>
      </Grid>
    </Grid>
  );
};

export default AppLayout;
