import { useState } from 'react';
import { Login, SignUp } from '@/components/auth';

const Auth = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const openSignUp = () => {
    setIsSignUpOpen(true);
  };

  const closeSignUp = () => {
    setIsSignUpOpen(false);
  };

  if (isSignUpOpen) {
    return <SignUp closeSignUp={closeSignUp} />;
  }

  return <Login openSignUp={openSignUp} />;
};

export default Auth;
