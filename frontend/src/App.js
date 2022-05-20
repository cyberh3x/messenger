import { TOKEN_KEY } from "constants";
import useUser from "hooks/useUser";
import AppRoot from "pages";
import { useEffect, useState } from "react";
import "styles/app.css";
import { getCookie } from "utils/cookie";

function App() {
  const [ready, setReady] = useState(false),
    token = getCookie(TOKEN_KEY),
    { verifyToken } = useUser(),
    render = () => <AppRoot />;

  useEffect(() => {
    return () =>
      token ? verifyToken().then(() => setReady(true)) : setReady(true);
  }, []);

  return ready && render();
}

export default App;
