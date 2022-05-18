import ContextProvider from "context/provider";
import AppRoot from "pages";

function App() {
  return (
    <ContextProvider>
      <AppRoot />
    </ContextProvider>
  );
}

export default App;
