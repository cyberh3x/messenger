import { useState } from "react";
import MenuComponent from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "components/button/iconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const Menu = ({ items = [], icon = <MoreVertIcon /> }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {icon}
        </IconButton>
        <MenuComponent
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {items.map(({ id, label, props }) => (
            <MenuItem {...props} key={id}>
              {label}
            </MenuItem>
          ))}
        </MenuComponent>
      </div>
    </ClickAwayListener>
  );
};

export default Menu;
