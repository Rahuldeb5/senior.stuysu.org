import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import { Box } from "@mui/material";

function App() {

  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App