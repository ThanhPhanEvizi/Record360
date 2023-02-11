import { Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { Col } from "../../components/elements";
import logo from "../../assets/image/logo.png";
import { PAGES } from "../../constants";
import LoginForm from "./components/LoginForm";

const LoginPage = () => {
  const history = useHistory();

  const handleForgotPassword = () => {
    return history.replace(`${PAGES.FORGOT_PASSWORD}`);
  };

  return (
    <Col sx={{ height: "100vh", alignItems: "center" }}>
      <Col sx={{ alignItems: "center", width: "25%", paddingTop: "100px" }}>
        <Typography>LOGIN TO</Typography>
        <img src={logo} alt="logo" />
        <LoginForm />
        <Typography
          onClick={handleForgotPassword}
          sx={{
            textAlign: "center",
            color: "red",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Forgot Password
        </Typography>
      </Col>
    </Col>
  );
};

export default LoginPage;
