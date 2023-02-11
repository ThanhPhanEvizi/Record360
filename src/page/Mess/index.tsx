import { Typography } from "@mui/material";
import { Col } from "../../components/elements";

const MessPage = () => {
  return (
    <Col
      sx={{ height: "100vh", alignItems: "center", justifyContent: "center" }}
    >
      <Typography sx={{ fontSize: "7em", fontWeight: "bold" }}>
        Mess PAGE
      </Typography>
    </Col>
  );
};

export default MessPage;
