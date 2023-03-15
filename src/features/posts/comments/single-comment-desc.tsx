import { useParams } from 'react-router-dom';

export const SingleCommentDesc = () => {
  const params = useParams();
  console.log(params);

  return <div>SingleCommentDesc</div>;
};
