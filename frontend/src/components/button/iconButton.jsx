import IconButtonComponent from "@mui/material/IconButton";

const IconButton = ({ children, ...props }) => {
  return <IconButtonComponent {...props}>{children}</IconButtonComponent>;
};

export default IconButton;
