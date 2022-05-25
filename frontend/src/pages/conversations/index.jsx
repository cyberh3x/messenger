import AppLayout from "pages/layouts/app";
import List from "components/list";
import { CONVERSATION } from "constants/routes";

const Conversations = () => {
  const conversations = [
      {
        id: 1,
        username: "Sajjad",
        isOnline: false,
        text: "Hello Sajjad",
        menu: [
          {
            id: 1,
            label: "Delete Conversation",
            props: {
              onClick: () => console.log("Delete Conversation"),
            },
          },
        ],
        href: CONVERSATION.replace(":id", 1),
      },
      {
        id: 2,
        username: "Ali",
        isOnline: true,
        text: "Hello Ali",
        href: CONVERSATION.replace(":id", 2),
      },
    ],
    Sidebar = () => <List items={conversations} />;
  return <AppLayout sidebar={<Sidebar />}></AppLayout>;
};

export default Conversations;
