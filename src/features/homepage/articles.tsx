import { Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { useGetPostsQuery } from '../../app/slices/posts/postInfoApi';
import { PostSkeleton } from '../../components';
import { Post } from '../../components/ui/post-card';

export const Articles = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, refetch } = useGetPostsQuery(page);

  function handleLoadMorePosts(type: 'inc' | 'dec') {
    setPage((prev) => (type === 'inc' ? prev + 1 : prev - 1));
  }

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <Stack spacing={4}>
        {Array.from(new Array(10)).map((_, idx) => (
          <PostSkeleton key={idx} />
        ))}
      </Stack>
    );
  }

  return (
    <>
      {data?.posts?.map((post, idx) => (
        <Post
          key={idx}
          showHeader
          {...post}
        />
      ))}

      {data?.pagination.prev && (
        <Button
          sx={{ mt: 4 }}
          variant="contained"
          disabled={isFetching}
          onClick={() => handleLoadMorePosts('dec')}
        >
          Back
        </Button>
      )}

      {data?.pagination.next && (
        <Button
          sx={{ mt: 4, ml: data?.pagination.prev ? 1 : 0 }}
          variant="contained"
          disabled={isFetching}
          onClick={() => handleLoadMorePosts('inc')}
        >
          Load More
        </Button>
      )}

      {!data?.posts && <Typography variant="h4">No Posts Found</Typography>}
    </>
  );
};
