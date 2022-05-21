import AppLayout from "pages/layouts/app";
import { useParams } from "react-router-dom";

const Conversation = () => {
  const { id } = useParams();
  return <AppLayout>ID: {id}</AppLayout>;
};

export default Conversation;
