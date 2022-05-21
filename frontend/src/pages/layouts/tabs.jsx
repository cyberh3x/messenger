import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HistoryIcon from "@mui/icons-material/History";
import GroupIcon from "@mui/icons-material/Group";
import ContactPageIcon from "@mui/icons-material/ContactPage";

const SidebarTabs = ({ handleChange, tab }) => {
  return (
    <Tabs value={tab} onChange={handleChange} aria-label="icon tabs example">
      <Tab
        icon={
          <HistoryIcon
            style={{ color: tab === 0 ? "#fff" : "rgba(0,0,0,.5)" }}
          />
        }
        aria-label="history"
      />
      <Tab
        icon={
          <GroupIcon style={{ color: tab === 1 ? "#fff" : "rgba(0,0,0,.5)" }} />
        }
        aria-label="groups"
      />
      <Tab
        icon={
          <ContactPageIcon
            style={{ color: tab === 2 ? "#fff" : "rgba(0,0,0,.5)" }}
          />
        }
        aria-label="contacts"
      />
    </Tabs>
  );
};

export default SidebarTabs;
