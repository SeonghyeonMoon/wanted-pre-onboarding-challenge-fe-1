import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import apis from '@/apis';
import Item from './Item';

type ListProps = {};

const List = ({}: ListProps) => {
  const router = useRouter();
  const [isToken, setIsToken] = useState(false);

  const { data: todoListData } = useQuery(['todos'], () => apis.todos.getTodos().then((res) => res.data.data), {
    enabled: isToken,
    retry: false,
    onError: () => {
      router.push('/auth');
    },
  });

  useEffect(() => {
    localStorage.getItem('token') ? setIsToken(true) : setIsToken(false);
  }, []);

  return (
    <ul>
      {todoListData?.map((todoData) => (
        <Item key={todoData.id} {...todoData} />
      ))}
    </ul>
  );
};

export default List;
