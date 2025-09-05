import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cabinet from "./pages/Cabinet";
import Events from "./pages/Events";
import Prom from "./pages/Prom";       
import Resources from "./pages/Resources";
import Magazines from "./pages/Magazines";
import './App.css';
import CustomCursor from "./comps/CustomCursor";
import { Box } from "@mui/material";

function App() {

  return (
    <Box>
      <BrowserRouter>
        <CustomCursor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/cabinet" element={<Cabinet />} />   
          <Route path="/prom" element={<Prom />} />         
          <Route path="/resources" element={<Resources />} />
          <Route path="/magazines" element={<Magazines />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App