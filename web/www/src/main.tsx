import "virtual:uno.css";
import "@unocss/reset/tailwind.css";
import "react-toastify/ReactToastify.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from 'react-toastify';
  

import "./index.css";
import HomePage from "./pages";
import Provider from "./providers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider accessToken={import.meta.env.VITE_APP_TELEGRAM_ACCESS_TOKEN}>
      <HomePage />
      <ToastContainer />
    </Provider>
  </StrictMode>
);

