import axios, { AxiosResponse } from 'axios';
import type {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
} from './types';

const baseURL = 'http://localhost:8080';

const instance = axios.create({ baseURL });

const login = (
  loginRequest: LoginRequest,
): Promise<AxiosResponse<LoginResponse>> =>
  instance.post('/users/login', loginRequest);

const signUp = (
  signUpRequest: SignUpRequest,
): Promise<AxiosResponse<SignUpResponse>> =>
  instance.post('/users/create', signUpRequest);

const apis = {
  auth: { login, signUp },
};

export default apis;
