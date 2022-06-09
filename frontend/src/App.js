import React, { useEffect, useState } from "react";
import useUser from "hooks/useUser";
import AppRoot from "pages";
import { getCookie } from "utils/cookie";
import { ToastContainer } from "react-toastify";
import { TOKEN_KEY } from "constants";
import "styles/app.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [ready, setReady] = useState(false),
    token = getCookie(TOKEN_KEY),
    { verifyToken } = useUser(),
    render = () => (
      <React.Fragment>
        <AppRoot />
        <ToastContainer position="bottom-right" theme="dark" />
      </React.Fragment>
    );

  useEffect(() => {
    token ? verifyToken().then(() => setReady(true)) : setReady(true);
  }, []);

  return ready && render();
}

export default App;
