export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  token: string;
};

export type SignUpRequest = {
  email: string;
  password: string;
};

export type SignUpResponse = {
  message: string;
  token: string;
};
