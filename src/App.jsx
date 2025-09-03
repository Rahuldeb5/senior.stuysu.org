import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Cabinet from "./pages/Cabinet"; // New import
import Prom from "./pages/Prom";       // New import
import Resources from "./pages/Resources"; // New import
import Magazines from "./pages/Magazines"; // New import
import React from 'react';
import './App.css';
import CustomCursor from "./comps/CustomCursor";

function App() {

  return (
    <div>
      <BrowserRouter>
        <CustomCursor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/cabinet" element={<Cabinet />} />   {/* New Route */}
          <Route path="/prom" element={<Prom />} />         {/* New Route */}
          <Route path="/resources" element={<Resources />} /> {/* New Route */}
          <Route path="/magazines" element={<Magazines />} /> {/* New Route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App