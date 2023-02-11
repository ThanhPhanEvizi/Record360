import { Typography } from "@mui/material";
import { Col } from "../../components/elements";

const ProfilePage = () => {
  return (
    <Col
      sx={{ height: "100vh", alignItems: "center", justifyContent: "center" }}
    >
      <Typography sx={{ fontSize: "7em", fontWeight: "bold" }}>
        Profile PAGE
      </Typography>
    </Col>
  );
};

export default ProfilePage;
