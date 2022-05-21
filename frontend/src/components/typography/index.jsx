import TypographyComponent from "@mui/material/Typography";

const Typography = (props) => {
  return <TypographyComponent {...props}>{props.children}</TypographyComponent>;
};

export default Typography;
