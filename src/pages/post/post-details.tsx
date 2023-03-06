import { useParams } from 'react-router-dom';

export const PostDetails = () => {
  const { slug } = useParams();

  console.log(slug);

  return <div>PostDetails</div>;
};
