import { Toaster } from "sonner";
import "./App.css";
import AppRoutes from "./routes/app-routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <AppRoutes />
    </BrowserRouter >
  );
}

export default App;
