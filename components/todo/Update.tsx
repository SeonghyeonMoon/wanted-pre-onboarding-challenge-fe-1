import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import apis from '@/apis';

type UpdateProps = {
  id: string;
  title: string;
  content: string;
  endUpdate: () => void;
};

const Update = ({ id, title, content, endUpdate }: UpdateProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [updateTodoFormData, setUpdateTodoFormData] = useState({
    title,
    content,
  });

  const { mutate: updateTodo } = useMutation(
    () => apis.todos.updateTodo(id, updateTodoFormData).then((res) => res.data.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos']);
      },
      onError: () => {
        router.push('/auth');
      },
    },
  );

  const handleSubmitUpdateForm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    updateTodo();
    endUpdate();
  };

  const handleChangeUpdateForm: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, value } = e.target;
    setUpdateTodoFormData((prev) => ({ ...prev, [id]: value }));
  };

  const isValidUpdateTodoFormData = () => {
    const { title, content } = updateTodoFormData;
    return title && content;
  };

  return (
    <form onSubmit={handleSubmitUpdateForm}>
      <label htmlFor='title'>Title</label>
      <input type='text' id='title' value={updateTodoFormData.title} onChange={handleChangeUpdateForm} />
      <label htmlFor='content'>Content</label>
      <input type='text' id='content' value={updateTodoFormData.content} onChange={handleChangeUpdateForm} />
      <button type='submit' disabled={!isValidUpdateTodoFormData()}>
        Submit
      </button>
      <button
        type='button'
        onClick={() => {
          setUpdateTodoFormData({ title, content });
          endUpdate();
        }}
      >
        Cancel
      </button>
    </form>
  );
};

export default Update;
