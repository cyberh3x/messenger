import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HistoryIcon from "@mui/icons-material/History";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { CONTACTS, CONVERSATIONS } from "constants/routes";
import { Link, useLocation } from "react-router-dom";

const SidebarTabs = ({ handleChange, tab }) => {
  const { pathname } = useLocation();
  return (
    <Tabs
      value={tab}
      onChange={handleChange}
      aria-label="icon tabs example"
      orientation="vertical"
    >
      <Tab
        icon={
          <Link to={CONVERSATIONS}>
            <HistoryIcon
              style={{ color: pathname === CONVERSATIONS ? "#fff" : "#686868" }}
            />
          </Link>
        }
        aria-label="history"
      />
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
  );
};

export default SidebarTabs;
