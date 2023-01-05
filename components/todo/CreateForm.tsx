import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import apis from '@/apis';

const CreateForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [createTodoFormData, setCreateTodoFormData] = useState({
    title: '',
    content: '',
  });

  const { mutate: addTodo } = useMutation(
    () => apis.todos.createTodo(createTodoFormData).then((res) => res.data.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos']);
      },
      onError: () => {
        router.push('/auth');
      },
    },
  );

  const handleChangeCreateForm: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, value } = e.target;
    setCreateTodoFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitCreateForm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    addTodo();
    setCreateTodoFormData({ title: '', content: '' });
  };

  const isValidCreateTodoFormData = () => {
    const { title, content } = createTodoFormData;
    return title && content;
  };

  return (
    <form onSubmit={handleSubmitCreateForm}>
      <label htmlFor='title'>Title</label>
      <input type='text' id='title' value={createTodoFormData.title} onChange={handleChangeCreateForm} />
      <label htmlFor='content'>Content</label>
      <input type='text' id='content' value={createTodoFormData.content} onChange={handleChangeCreateForm} />
      <button type='submit' disabled={!isValidCreateTodoFormData()}>
        Submit
      </button>
    </form>
  );
};

export default CreateForm;
