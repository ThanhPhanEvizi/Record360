import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Col, UiLoadingButton } from "../../../components/elements";
import { InputField } from "../../../components/FormControl";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  fetchForgotPassword,
  selectApiMessage,
  selectLoading,
  selectStatus,
} from "../../../redux/auth/authSlice";
import { STATUS_AXIOS } from "../../../constants";

const ForgotPasswordForm = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectLoading);
  const status = useAppSelector(selectStatus);
  const apiMessage = useAppSelector(selectApiMessage);
  const initialValues: any = {
    email: "",
  } as any;
  const schema = yup
    .object({
      email: yup
        .string()
        .required("Please fill in your email address")
        .email("Invalid email")
        .matches(/^(?!.*@[^,]*,)/),
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
      setError("email", {
        type: "sever",
        message: apiMessage,
      });
    }
  }, [setError, status, isLoading, apiMessage]);

  const handleFormSubmit = (formValue: any) => {
    dispatch(fetchForgotPassword(formValue));
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
          <UiLoadingButton isLoading={isLoading} isSubmitting={isSubmitting}>
            Reset
          </UiLoadingButton>
        </Col>
      </form>
    </Col>
  );
};

export default ForgotPasswordForm;
