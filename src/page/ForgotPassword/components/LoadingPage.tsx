import { CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { Col } from "../../../components/elements";
import { PAGES } from "../../../constants";
import { resetStatusFetchAuth } from "../../../redux/auth/authSlice";
import { sleep } from "../../../until/helpers";

const LoadingPage = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const redirectLoginPage = async () => {
      await sleep(5000);

      history.replace(`${PAGES.LOGIN}`);
    };
    redirectLoginPage();
  }, [dispatch, history]);

  useEffect(() => {
    return () => {
      dispatch(resetStatusFetchAuth());
    };
  }, [dispatch]);

  return (
    <Col sx={{ textAlign: "center", alignItems: "center" }}>
      <Typography sx={{ fontSize: "1.25em", fontWeight: "bold" }}>
        Please check your email for password
        <br /> reset instructions
      </Typography>
      <Typography
        sx={{ fontSize: "0.75em", opacity: "0.6", margin: "5px 0px" }}
      >
        Redirecting to login
      </Typography>
      <CircularProgress />
    </Col>
  );
};

export default LoadingPage;
