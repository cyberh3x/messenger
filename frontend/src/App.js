import ContextProvider from "context/provider";
import AppRoot from "pages";
import "styles/app.css";

function App() {
  return (
    <ContextProvider>
      <AppRoot />
    </ContextProvider>
  );
}

export default App;
