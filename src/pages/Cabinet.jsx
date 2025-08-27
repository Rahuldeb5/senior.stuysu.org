import { Box, Card, CardMedia, Typography } from "@mui/material";
import "./Cabinet.css";
import CabinetData from "../data/cabinet.json";
import Navbar from "../comps/Navbar";

const Cabinet = () => {
  return (
    <Box className="cabinet">
      <Navbar />

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
              <CardMedia component="img" image={e.img} alt={e.bio} />
            </Card>

            <Box className="member-bio">
              <Typography className="bio">{e.bio}</Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Cabinet;
