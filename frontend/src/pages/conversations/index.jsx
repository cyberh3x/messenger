import AppLayout from "pages/layouts/app";
import List from "components/list";
import { CONVERSATION } from "constants/routes";

const Conversations = () => {
  const conversations = [],
    Sidebar = () => <List items={conversations} />;
  return <AppLayout sidebar={<Sidebar />}></AppLayout>;
};

export default Conversations;
