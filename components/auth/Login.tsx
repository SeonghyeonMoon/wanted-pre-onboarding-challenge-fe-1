import { useRouter } from 'next/router';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import apis from '../../apis';
import type { LoginRequest } from '../../types';

type LoginProps = {
  openSignUp: () => void;
};

const Login = ({ openSignUp }: LoginProps) => {
  const router = useRouter();
  const [loginFormData, setLoginFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  });

  const handleChangeLoginFormData: ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    const { id, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitLoginFormData: FormEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();
    const {
      data: { token },
    } = await apis.auth.login(loginFormData);
    localStorage.setItem('token', token);
    router.push('/');
  };

  const isValidLoginFormData = () => {
    const { email, password } = loginFormData;
    const emailRegex = /@*\./;
    return emailRegex.test(email) && password.length >= 8;
  };

  return (
    <form name='login-form' onSubmit={handleSubmitLoginFormData}>
      <h1>Login</h1>
      <label htmlFor='email'>Email</label>
      <input type='email' id='email' onChange={handleChangeLoginFormData} />
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        id='password'
        onChange={handleChangeLoginFormData}
      />
      <button type='submit' disabled={!isValidLoginFormData()}>
        Submit
      </button>
      <button type='button' onClick={openSignUp}>
        SignUp
      </button>
    </form>
  );
};

export default Login;
