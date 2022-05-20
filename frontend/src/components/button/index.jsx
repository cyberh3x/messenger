import ButtonComponent from "@mui/material/Button";

const Button = ({ children, ...props }) => {
  return (
    <ButtonComponent variant="contained" {...props}>
      {children}
    </ButtonComponent>
  );
};

export default Button;
