import "./Navbar.css";
import { Box, IconButton, Link } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link as RouterLink } from "react-router-dom";
import data from "../data/webpages.json";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box className="navbar">
      <Box className="menu-button">
        <IconButton onClick={toggleMenu}>
          {open ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Box className={`menu ${open ? 'visible' : 'hidden'}`}>
        {data.map((e) => (
          <Box key={e.link} className="menu-item">
            <Link
              component={RouterLink}
              to={e.link}
              underline="hover"
              variant="h6"
            >
              {e.name}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Navbar;
