import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import PlainView from "../app/terminal/PlainView";
import Terminal from "../app/terminal/Terminal";
import { TrackRoute, WorkRoute } from "../app/terminal/routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Terminal />} />
        <Route path="/plain" element={<PlainView />} />
        <Route path="/work/:slug" element={<WorkRoute />} />
        {/* /cs, /ux, /consulting, /business. Unknown slugs redirect home. */}
        <Route path="/:track" element={<TrackRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
