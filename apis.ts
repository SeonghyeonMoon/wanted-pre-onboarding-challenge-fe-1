import axios, { AxiosResponse } from 'axios';
import type {
  CreateTodoRequest,
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
  TodoData,
  UpdateTodoRequest,
} from './types';

const baseURL = 'http://localhost:8080';

export const instance = axios.create({ baseURL });

const login = (
  loginRequest: LoginRequest,
): Promise<AxiosResponse<LoginResponse>> =>
  instance.post('/users/login', loginRequest);

const signUp = (
  signUpRequest: SignUpRequest,
): Promise<AxiosResponse<SignUpResponse>> =>
  instance.post('/users/create', signUpRequest);

const getTodos = (): Promise<AxiosResponse<{ data: TodoData[] }>> =>
  instance.get('/todos');

const getTodoById = (id: string): Promise<AxiosResponse<{ data: TodoData }>> =>
  instance.get(`/todos/${id}`);

const createTodo = (
  createTodoRequest: CreateTodoRequest,
): Promise<AxiosResponse<{ data: TodoData }>> =>
  instance.post('/todos', createTodoRequest);

const updateTodo = (
  id: string,
  updateTodoRequest: UpdateTodoRequest,
): Promise<AxiosResponse<{ data: TodoData }>> =>
  instance.put(`/todos/${id}`, updateTodoRequest);

const deleteTodo = (id: string): Promise<AxiosResponse> =>
  instance.delete(`/todos/${id}`);

const apis = {
  auth: { login, signUp },
  todos: { getTodos, getTodoById, createTodo, updateTodo, deleteTodo },
};

export default apis;
