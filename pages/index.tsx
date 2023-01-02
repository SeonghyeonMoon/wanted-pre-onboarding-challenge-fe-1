import { useRouter } from 'next/router';

const Todo = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/auth');
  };

  return (
    <>
      <button type='button' onClick={logout}>
        로그아웃
      </button>
    </>
  );
};

export default Todo;
