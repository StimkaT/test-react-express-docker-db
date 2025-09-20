import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import SendMessagePage from "./components/SendMessagePage";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/send-message" element={<SendMessagePage />} />
        </Routes>
      </Router>
  );
}

export default App;
