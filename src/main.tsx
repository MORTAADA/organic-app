import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Restore a deep link after GitHub Pages serves the SPA fallback (404.html).
const redirect = sessionStorage.getItem("gh-pages-redirect");
if (redirect) {
  sessionStorage.removeItem("gh-pages-redirect");
  window.history.replaceState(null, "", `${import.meta.env.BASE_URL}${redirect.replace(/^\//, "")}`);
}

document.documentElement.classList.add("dark");

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element #root not found");
}

createRoot(root).render(<App />);
