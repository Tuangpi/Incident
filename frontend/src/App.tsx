import { Provider } from "react-redux";
import store from "./store";
import { AuthContextProvider } from "./context/AuthContextProvider";
import ErrorBoundary from "./ErrorBoundary";
import MainRouter from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();

const App = () => {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <AuthContextProvider>
                    <QueryClientProvider client={queryClient}>
                        <MainRouter />
                        <Toaster />
                    </QueryClientProvider>
                </AuthContextProvider>
            </Provider>
        </ErrorBoundary>
    );
};
export default App;
