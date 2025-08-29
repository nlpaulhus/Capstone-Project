import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import AuthenticationProvider from "./context/AuthenticationContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthenticationProvider>
      <App />
    </AuthenticationProvider>
  </StrictMode>
);
