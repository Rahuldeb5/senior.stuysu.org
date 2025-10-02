import { useState } from "react";
import "./DropdownBoxes.css";
import { Box, Collapse, Typography } from "@mui/material";
import Data from "../data/magazines.json";

const DropdownBoxes = () => {
  const [openBox, setOpenBox] = useState(0);

  const handleToggle = (boxNumber) => {
    setOpenBox(openBox === boxNumber ? null : boxNumber);
  };

  return (
    <Box className="dropdown-container">
      <Box
        className="senior"
        sx={{ padding: 2, marginBottom: 2, cursor: "pointer" }}
        onClick={() => handleToggle(1)}
      >
        <Typography variant="h4" className="magazineTitle">
          Senior Magazines
        </Typography>
        <Collapse in={openBox === 1}>
          <Box className="dropdown">
            {Data.seniorMagazines.map((item, index) => (
              <Box key={index} className="dropdown-item">
                <Box className="dropdown-item-container">
                  <Typography
                    className="monthTitle"
                    variant="h5"
                    style={{
                      backgroundColor: item.color,
                      color: item.textcolor,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <embed
                    className="magazine-pdf"
                    src={item.url}
                    width="600em"
                    height="600em"
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

export default DropdownBoxes;