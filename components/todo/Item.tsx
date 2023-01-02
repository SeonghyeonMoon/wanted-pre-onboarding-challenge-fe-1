import { useMutation, useQueryClient } from '@tanstack/react-query';
import apis from '../../apis';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';

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

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateTodoFormData, setUpdateTodoFormData] = useState({
    title,
    content,
  });

  const { mutate: updateTodo } = useMutation(
    () =>
      apis.todos
        .updateTodo(id, updateTodoFormData)
        .then((res) => res.data.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos']);
      },
    },
  );

  const handleSubmitUpdateForm: FormEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault();
    updateTodo();
    setIsUpdating(false);
  };

  const handleChangeUpdateForm: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, value } = e.target;
    setUpdateTodoFormData((prev) => ({ ...prev, [id]: value }));
  };

  const isValidUpdateTodoFormData = () => {
    const { title, content } = updateTodoFormData;
    return title && content;
  };

  if (isUpdating) {
    return (
      <form onSubmit={handleSubmitUpdateForm}>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          value={updateTodoFormData.title}
          onChange={handleChangeUpdateForm}
        />
        <label htmlFor='content'>Content</label>
        <input
          type='text'
          id='content'
          value={updateTodoFormData.content}
          onChange={handleChangeUpdateForm}
        />
        <button type='submit' disabled={!isValidUpdateTodoFormData()}>
          Submit
        </button>
        <button
          type='button'
          onClick={() => {
            setUpdateTodoFormData({ title, content });
            setIsUpdating(false);
          }}
        >
          Cancel
        </button>
      </form>
    );
  }

  return (
    <li>
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
