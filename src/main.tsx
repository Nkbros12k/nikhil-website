import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../app/App";
import Project from "../app/pages/Project";
import TrackPage from "../app/pages/TrackPage";
import "../styles/fonts.css";
import "../styles/tailwind.css";
import "../styles/theme.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/work/:slug" element={<Project />} />
        {/* /cs, /ux, /consulting, /business. Unknown slugs redirect home. */}
        <Route path="/:track" element={<TrackPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
