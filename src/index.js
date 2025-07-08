import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary>
    <GoogleOAuthProvider clientId="327082984048-bmq89edi48t5p5e45umo60j0c8qfi8ca.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </ErrorBoundary>
);
