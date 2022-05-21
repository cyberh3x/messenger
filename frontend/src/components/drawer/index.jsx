import { useEffect, useState } from "react";
import DrawerComponent from "@mui/material/Drawer";

const Drawer = ({ children, open = false, handler }) => {
  const [state, setState] = useState(open);

  useEffect(() => {
    setState(open);
  }, [open]);

  return (
    <DrawerComponent anchor="left" open={state} onClose={handler}>
      {children}
    </DrawerComponent>
  );
};

export default Drawer;
