import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { Col } from "../../components/elements";
import { PAGES, STATUS_AXIOS } from "../../constants";
import { selectLoading, selectStatus } from "../../redux/auth/authSlice";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import LoadingPage from "./components/LoadingPage";

const ForgotPasswordPage = () => {
  const history = useHistory();
  const status = useAppSelector(selectStatus);
  const isLoading = useAppSelector(selectLoading);
  const [isEmailVerification, setIsEmailVerification] =
    useState<boolean>(false);
  useEffect(() => {
    console.log("status: ", status);
    if (status === STATUS_AXIOS.OK && !isLoading) {
      setIsEmailVerification(true);
    }
  }, [status, isLoading]);

  return (
    <Col
      sx={{ height: "100vh", alignItems: "center", justifyContent: "center" }}
    >
      {isEmailVerification ? (
        <LoadingPage />
      ) : (
        <Col sx={{ alignItems: "center", width: "25%" }}>
          <Typography sx={{ fontSize: "1.5em", fontWeight: "bold" }}>
            Forgot your password
          </Typography>
          <Typography sx={{ textAlign: "center" }}>
            Enter your email address to receive instructions on how to reset
            your password
          </Typography>
          <ForgotPasswordForm />
          <Typography
            onClick={() => history.replace(`${PAGES.LOGIN}`)}
            sx={{
              textAlign: "center",
              color: "red",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Back to log in
          </Typography>
          {!!status && isEmailVerification && (
            <Typography>Email not exits</Typography>
          )}
        </Col>
      )}
    </Col>
  );
};

export default ForgotPasswordPage;
