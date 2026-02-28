import { Toaster } from "sonner";
import "./App.css";
import AppRoutes from "./routes/app-routes";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

function App() {
  const queryClient = new QueryClient();
  useEffect(() => {
    document.documentElement.classList.add("dark");
  });
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" closeButton richColors />
        <AppRoutes />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
