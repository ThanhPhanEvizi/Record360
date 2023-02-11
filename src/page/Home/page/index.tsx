import { Typography } from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import { Col } from "../../../components/elements";
import { selectRoutes } from "../../../redux/app/appSlice";

const HomePage = () => {
  console.log("homePage");
  const listRouter = useAppSelector(selectRoutes);
  console.log("listRouter:", listRouter);

  return (
    <Col
      sx={{ height: "100vh", alignItems: "center", justifyContent: "center" }}
    >
      <Typography sx={{ fontSize: "7em", fontWeight: "bold" }}>HOME</Typography>
    </Col>
  );
};

export default HomePage;
