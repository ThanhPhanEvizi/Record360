import { Typography } from "@mui/material";
import { Col } from "../../components/elements";

const SettingPage = () => {
  return (
    <Col
      sx={{ height: "100vh", alignItems: "center", justifyContent: "center" }}
    >
      <Typography sx={{ fontSize: "7em", fontWeight: "bold" }}>
        SETTING PAGE
      </Typography>
    </Col>
  );
};

export default SettingPage;
