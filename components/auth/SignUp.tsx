import { ChangeEventHandler, FormEventHandler, useState } from 'react';

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

  const handleChangeSignUpFormData: ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    const { id, value } = e.target;
    setSignUpFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitSignUpFormData: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(signUpFormData);
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
      <button type='submit'>Submit</button>
      <button type='button' onClick={closeSignUp}>
        Login
      </button>
    </form>
  );
};

export default SignUp;
