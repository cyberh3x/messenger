import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HistoryIcon from "@mui/icons-material/History";
import ContactPageIcon from "@mui/icons-material/ContactPage";

const SidebarTabs = ({ handleChange, tab }) => {
  return (
    <Tabs
      value={tab}
      onChange={handleChange}
      aria-label="icon tabs example"
      orientation="vertical"
    >
      <Tab
        icon={<HistoryIcon style={{ color: tab == 0 ? "#fff" : "#686868" }} />}
        aria-label="history"
      />
      <Tab
        icon={
          <ContactPageIcon style={{ color: tab == 1 ? "#fff" : "#686868" }} />
        }
        aria-label="contacts"
      />
    </Tabs>
  );
};

export default SidebarTabs;
