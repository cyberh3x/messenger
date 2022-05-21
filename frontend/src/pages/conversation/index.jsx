import AppLayout from "pages/layouts/app";
import { useParams } from "react-router-dom";
import Body from "./body";
import Header from "./header";

const Conversation = () => {
  const { id } = useParams();
  return (
    <AppLayout>
      <Header />
      <Body />
    </AppLayout>
  );
};

export default Conversation;
