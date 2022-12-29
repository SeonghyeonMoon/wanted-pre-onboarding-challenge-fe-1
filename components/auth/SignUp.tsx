import { useState } from 'react';

type SignUpProps = {
  closeSignUp: () => void;
};

type SignUpFormData = {
  email: string;
  password: string;
};

const SignUp = ({ closeSignUp }: SignUpProps) => {
  const [signUpFormData, setSignUpFormData] = useState<SignUpFormData>({
    email: '',
    password: '',
  });

  return (
    <form name='sign-up-form'>
      <h1>Signup</h1>
      <label htmlFor='email'>Email</label>
      <input type='email' id='email' />
      <label htmlFor='password'>Password</label>
      <input type='password' id='password' />
      <button type='submit'>Submit</button>
      <button type='button' onClick={closeSignUp}>
        Login
      </button>
    </form>
  );
};

export default SignUp;
