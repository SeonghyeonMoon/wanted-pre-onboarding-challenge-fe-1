import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import apis from '@/apis';
import Item from './Item';

type ListProps = {};

const List = ({}: ListProps) => {
  const [isToken, setIsToken] = useState(false);

  const { data: todoListData } = useQuery(['todos'], () => apis.todos.getTodos().then((res) => res.data.data), {
    enabled: isToken,
    retry: false,
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
