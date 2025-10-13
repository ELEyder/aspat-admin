import { Toaster } from "sonner";
import "./App.css";
import AppRoutes from "./routes/app-routes";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <AppRoutes />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
