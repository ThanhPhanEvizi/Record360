import uuid from "react-uuid";
import { STATUS_AXIOS, USERS_ROLE } from "../constants";
import { ForgotPasswordProps, LoginProps } from "../types/models/auth";
import { randomTrueOrFalse, sleep } from "../until/helpers";

const authApi = {
  async login(params: LoginProps) {
    const isSuccess = randomTrueOrFalse();
    const isAdmin = randomTrueOrFalse();
    await sleep(5000);
    if (isSuccess) {
      return {
        success: {
          status: STATUS_AXIOS.OK,
          response: {
            access: uuid(),
            refresh: uuid(),
            username: params.email,
            role: isAdmin ? USERS_ROLE.ADMIN : USERS_ROLE.USER,
          },
        },
      };
    }
    return {
      error: {
        status: STATUS_AXIOS.BAD_REQUEST,
        message: "Incorrect account or password",
      },
    };
  },
  async forgotPassword(params: ForgotPasswordProps) {
    const isSuccess = randomTrueOrFalse();
    await sleep(2000);
    if (isSuccess) {
      return {
        success: {
          status: STATUS_AXIOS.OK,
          response: {},
        },
      };
    }
    return {
      error: {
        status: STATUS_AXIOS.BAD_REQUEST,
        message: "Email not exits ",
      },
    };
  },
};

export default authApi;
