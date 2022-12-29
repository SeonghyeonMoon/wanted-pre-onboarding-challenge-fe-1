import { useState } from 'react';

type LoginProps = {
  openSignUp: () => void;
};

type LoginFormData = {
  email: string;
  password: string;
};

const Login = ({ openSignUp }: LoginProps) => {
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  return (
    <form name='login-form'>
      <h1>Login</h1>
      <label htmlFor='email'>Email</label>
      <input type='email' id='email' />
      <label htmlFor='password'>Password</label>
      <input type='password' id='password' />
      <button type='submit'>Submit</button>
      <button type='button' onClick={openSignUp}>
        SignUp
      </button>
    </form>
  );
};

export default Login;
