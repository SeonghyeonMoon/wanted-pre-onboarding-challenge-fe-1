import { useMutation, useQueryClient } from '@tanstack/react-query';
import apis from '../../apis';

type ItemProps = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const Item = ({ id, title, content, createdAt, updatedAt }: ItemProps) => {
  const queryClient = useQueryClient();

  const { mutate: deleteTodo } = useMutation(
    () => apis.todos.deleteTodo(id).then((res) => res.data.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos']);
      },
    },
  );

  const handleClickDeleteButton = () => {
    deleteTodo();
  };

  return (
    <li>
      <p>Title: {title}</p>
      <p>Content: {content}</p>
      <p>Created At: {createdAt}</p>
      <p>Updated At: {updatedAt}</p>
      <button onClick={handleClickDeleteButton}>Delete</button>
    </li>
  );
};

export default Item;
