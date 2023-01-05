import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import apis from '@/apis';
import Update from './Update';

type ItemProps = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const Item = ({ id, title, content, createdAt, updatedAt }: ItemProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);

  const { mutate: deleteTodo } = useMutation(() => apis.todos.deleteTodo(id).then((res) => res.data.data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
    onError: () => {
      router.push('/auth');
    },
  });

  const handleClickDeleteButton = () => {
    deleteTodo();
  };

  const endUpdate = () => {
    setIsUpdating(false);
  };

  const handleClickItem = () => {
    router.push(`?id=${id}`);
  };

  if (isUpdating) {
    return <Update id={id} title={title} content={content} endUpdate={endUpdate} />;
  }

  return (
    <li onClick={handleClickItem}>
      <p>Title: {title}</p>
      <p>Content: {content}</p>
      <p>Created At: {createdAt}</p>
      <p>Updated At: {updatedAt}</p>
      <button type='button' onClick={() => setIsUpdating(true)}>
        Update
      </button>
      <button onClick={handleClickDeleteButton}>Delete</button>
    </li>
  );
};

export default Item;
