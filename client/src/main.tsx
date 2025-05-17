import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add meta tags and links directly in index.html instead of using @react-head/core

createRoot(document.getElementById("root")!).render(
  <App />
);
