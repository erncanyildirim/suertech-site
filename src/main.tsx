import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./App";
import { LangProvider } from "./i18n";
import "./index.css";

// the preview build runs inside a sandboxed page, so it routes by hash
const Router = import.meta.env.VITE_HASH ? HashRouter : BrowserRouter;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <LangProvider><App /></LangProvider>
    </Router>
  </StrictMode>
);
