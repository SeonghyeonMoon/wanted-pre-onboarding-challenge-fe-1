import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { instance } from '@/apis';
import { CreateForm, Detail, List } from '@/components/todo';

const Todo = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      instance.defaults.headers['Authorization'] = token;
    } else {
      router.push('/auth');
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/auth');
  };

  return (
    <>
      <button type='button' onClick={logout}>
        로그아웃
      </button>
      <CreateForm />
      <List />
      <Detail />
    </>
  );
};

export default Todo;
