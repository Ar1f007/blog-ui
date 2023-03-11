import { useGetCommentsQuery } from '../../../app/slices/comments';

const Comments = () => {
  const { data, isLoading, error } = useGetCommentsQuery(
    '64062a051494b96c33fc5ed3',
  );
  console.log(isLoading, error);
  console.log(data);
  return null;
};

export default Comments;
