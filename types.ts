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

export type TodoData = {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateTodoRequest = {
  title: string;
  content: string;
};

export type UpdateTodoRequest = {
  title: string;
  content: string;
};
