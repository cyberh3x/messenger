import { Link, useLocation } from "react-router-dom";
import useUser from "hooks/useUser";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "components/button/iconButton";
import { CONTACTS } from "constants/routes";
import ContactPageIcon from "@mui/icons-material/ContactPage";

const SidebarTabs = ({ handleChange, tab }) => {
  const { pathname } = useLocation(),
    { logout } = useUser();
  return (
    <>
      <Tabs value={tab} aria-label="icon tabs example" orientation="vertical">
        <Tab
          icon={
            <Link to={CONTACTS}>
              <ContactPageIcon
                style={{ color: pathname === CONTACTS ? "#fff" : "#686868" }}
              />
            </Link>
          }
          aria-label="contacts"
        />
      </Tabs>
      <IconButton
        style={{
          position: "absolute",
          bottom: "15px",
          left: 0,
          right: 0,
        }}
        onClick={logout}
      >
        <LogoutIcon style={{ color: "#fff" }} />
      </IconButton>
    </>
  );
};

export default SidebarTabs;
