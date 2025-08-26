import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Box } from "@mui/material";

function App() {

  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App