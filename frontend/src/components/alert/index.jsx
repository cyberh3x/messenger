import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const AlertBox = ({ items = [], title = "" }) => {
  return (
    <>
      {Object.keys(items).length > 0 && (
        <Alert severity="error">
          <AlertTitle>{title}</AlertTitle>
          <List>
            {items.map((item, index) => (
              <ListItem key={index}>
                <strong>{item}</strong>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
    </>
  );
};

export default AlertBox;
