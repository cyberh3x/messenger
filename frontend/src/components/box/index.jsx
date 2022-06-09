import BoxComponent from "@mui/material/Box";

const Box = ({ children }) => {
  return (
    <BoxComponent bgcolor={"white"} borderRadius={3} boxShadow={1} p={2}>
      {children}
    </BoxComponent>
  );
};

export default Box;
