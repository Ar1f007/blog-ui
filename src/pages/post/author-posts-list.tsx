import { Container } from '@mui/material';

import { useGetAuthorsPostQuery } from '../../app/slices/posts/postInfoApi';
import { Post } from '../../components/ui/post-card';
import { useAppSelector } from '../../hooks/store';

export const AuthorsPostList = () => {
  const userId = useAppSelector((s) => s.user.data?.id) ?? '';

  const { isLoading, data } = useGetAuthorsPostQuery(userId, {
    skip: !userId,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Container maxWidth="md">
        {data?.posts?.map((post) => (
          <Post
            key={post.slug}
            {...post}
            showHeader={false}
          />
        ))}
      </Container>
    </>
  );
};
