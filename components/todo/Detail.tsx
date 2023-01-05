import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import apis from '@/apis';

const Detail = () => {
  const router = useRouter();

  const { data } = useQuery(
    ['todos', router.query.id],
    () => {
      return apis.todos.getTodoById(router.query.id as string).then((res) => res.data.data);
    },
    {
      enabled: !!router.query.id,
    },
  );

  if (!data) {
    return null;
  }

  return (
    <div>
      <p>Title: {data?.title}</p>
      <p>Content: {data?.content}</p>
      <p>Created At: {data?.createdAt}</p>
      <p>Updated At: {data?.updatedAt}</p>
    </div>
  );
};

export default Detail;
