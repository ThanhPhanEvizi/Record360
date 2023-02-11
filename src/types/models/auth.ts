export interface LoginProps {
  email: string;
  password: string;
}

export interface ForgotPasswordProps {
  email: string;
}

export interface LoginApiItems {
  username: string;
  access: string;
  refresh: string;
  role: string;
}

export interface ForgotPasswordApiItems {
  email: string;
}
