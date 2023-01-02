type ItemProps = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const Item = ({ id, title, content, createdAt, updatedAt }: ItemProps) => {
  return (
    <li>
      <p>Title: {title}</p>
      <p>Content: {content}</p>
      <p>Created At: {createdAt}</p>
      <p>Updated At: {updatedAt}</p>
    </li>
  );
};

export default Item;
