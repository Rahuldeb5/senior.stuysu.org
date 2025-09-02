import { Box, Card, CardMedia, Typography } from "@mui/material";
import Navbar from "../comps/Navbar";
import CabinetData from "../data/cabinet.json";
import "./Cabinet.css";

const Cabinet = () => {
  return (
    <Box className="cabinet">
      <Navbar />
      <Box className="cabinet-heading-container">
        <Typography className="cabinet-heading">
          OUR CABINET
        </Typography>
      </Box>
      {CabinetData.map((e, index) => (
        <Box className="cabinet-member" key={index}>
          <Box
            className="member-section"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: index % 2 === 0 ? "row" : "row-reverse" }
            }}
          >
            <Card className="img-card">
              <Typography className="member-role">{e.role}</Typography>
              <CardMedia component="img" image={e.img} alt={e.name} />
              <Typography className="member-name">{e.name}</Typography>
            </Card>

            <Card className="bio-card">
              <Typography className="bio">{e.bio}</Typography>
            </Card>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Cabinet;
