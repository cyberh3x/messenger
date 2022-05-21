import Grid from "@mui/material/Grid";
import Item from "./item";

const List = ({ items = [] }) => {
  return (
    <Grid item xs={12} mt={3}>
      {items.map((item, index) => (
        <Item key={index} {...item} />
      ))}
    </Grid>
  );
};

export default List;
