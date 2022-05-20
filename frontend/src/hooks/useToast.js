import { toast } from "react-toastify";

const useToast = () => {
  const generate = (content, type = "success") =>
    type in toast ? toast[type](content) : {};
  return { generate };
};

export default useToast;
