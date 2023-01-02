import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import apis from '../../apis';

type ListProps = {};

const List = ({}: ListProps) => {
  const [isToken, setIsToken] = useState(false);

  const { data } = useQuery(
    ['todos'],
    () => apis.todos.getTodos().then((res) => res.data.data),
    {
      enabled: isToken,
      retry: false,
    },
  );

  useEffect(() => {
    localStorage.getItem('token') ? setIsToken(true) : setIsToken(false);
  }, []);

  return (
    <ul>
      {data?.map(({ id, title, content, createdAt, updatedAt }) => (
        <li key={id}>
          <p>Title: {title}</p>
          <p>Content: {content}</p>
          <p>Created At: {createdAt}</p>
          <p>Updated At: {updatedAt}</p>
        </li>
      ))}
    </ul>
  );
};

export default List;
