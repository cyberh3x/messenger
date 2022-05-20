import { Navigate } from "react-router-dom";
import { HOME } from "constants/routes";
import useUser from "hooks/useUser";

const GuestRoute = ({ redirectPath = HOME, children }) => {
  const { isLoggedIn } = useUser();
  if (isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default GuestRoute;
