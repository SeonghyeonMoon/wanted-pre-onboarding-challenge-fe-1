import { useRouter } from 'next/router';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import apis from '../../apis';
import type { SignUpRequest } from '../../types';

type SignUpProps = {
  closeSignUp: () => void;
};

const SignUp = ({ closeSignUp }: SignUpProps) => {
  const router = useRouter();
  const [signUpFormData, setSignUpFormData] = useState<SignUpRequest>({
    email: '',
    password: '',
  });

  const handleChangeSignUpFormData: ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    const { id, value } = e.target;
    setSignUpFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitSignUpFormData: FormEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();
    const {
      data: { token },
    } = await apis.auth.signUp(signUpFormData);
    localStorage.setItem('token', token);
    router.push('/');
  };

  const isValidSignUpFormData = () => {
    const { email, password } = signUpFormData;
    const emailRegex = /@*\./;
    return emailRegex.test(email) && password.length >= 8;
  };

  return (
    <form name='sign-up-form' onSubmit={handleSubmitSignUpFormData}>
      <h1>Signup</h1>
      <label htmlFor='email'>Email</label>
      <input type='email' id='email' onChange={handleChangeSignUpFormData} />
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        id='password'
        onChange={handleChangeSignUpFormData}
      />
      <button type='submit' disabled={!isValidSignUpFormData()}>
        Submit
      </button>
      <button type='button' onClick={closeSignUp}>
        Login
      </button>
    </form>
  );
};

export default SignUp;
