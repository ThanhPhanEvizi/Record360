import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Checkbox, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { Col, Row, UiLoadingButton } from "../../../components/elements";
import { InputField, PasswordField } from "../../../components/FormControl";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  fetchLogin,
  resetStatusFetchAuth,
  selectApiMessage,
  selectLoading,
  selectStatus,
} from "../../../redux/auth/authSlice";
import { PAGES, STATUS_AXIOS } from "../../../constants";
import { LoginProps } from "../../../types/models/auth";

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectLoading);
  const status = useAppSelector(selectStatus);
  const apiMessage = useAppSelector(selectApiMessage);

  const initialValues: any = {
    email: "",
    password: "",
  } as any;
  const schema = yup
    .object({
      email: yup
        .string()
        .required("Please fill in your email address")
        .email("Invalid email")
        .matches(/^(?!.*@[^,]*,)/),
      password: yup.string().required("Please fill in your password"),
    })
    .required();

  const {
    setError,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<any>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (status === STATUS_AXIOS.BAD_REQUEST && !isLoading) {
      setError("password", {
        type: "sever",
        message: apiMessage,
      });
      setError("email", {
        type: "sever",
      });
    } else {
      if (status === STATUS_AXIOS.OK && !isLoading) {
        history.push(`${PAGES.HOME_PAGE}`);
      }
    }
  }, [setError, status, isLoading, apiMessage, history]);

  useEffect(() => {
    return () => {
      dispatch(resetStatusFetchAuth());
    };
  }, [dispatch]);

  const handleFormSubmit = (formValue: LoginProps) => {
    dispatch(fetchLogin(formValue));
  };

  return (
    <Col sx={{ marginTop: "20px", width: "100%" }}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Col>
          <InputField
            name="email"
            control={control}
            label="Email Address"
            placeholder="Enter Email Address"
          />
          <PasswordField
            name="password"
            control={control}
            label="Password"
            placeholder="Enter Password"
          />
          <Row sx={{ alignItems: "center" }}>
            <Checkbox />
            <Typography>Remember me</Typography>
          </Row>
          <UiLoadingButton isLoading={isLoading} isSubmitting={isSubmitting}>
            Sign Up Now
          </UiLoadingButton>
        </Col>
      </form>
    </Col>
  );
};

export default LoginForm;
