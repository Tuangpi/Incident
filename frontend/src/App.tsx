import { Provider } from "react-redux";
import store from "./store";
import { AuthContextProvider } from "./context/AuthContextProvider";
import ErrorBoundary from "./ErrorBoundary";
import MainRouter from "./router";

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AuthContextProvider>
          <MainRouter />
        </AuthContextProvider>
      </Provider>
    </ErrorBoundary>
  );
};
export default App;
