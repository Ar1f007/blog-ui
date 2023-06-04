import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { fetchPostsAction } from '../../app/slices/posts';
import { PostSkeleton } from '../../components';
import { Post } from '../../components/ui/post-card';
import { useAppDispatch, useAppSelector } from '../../hooks/store';

export const Articles = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((s) => s.post);

  useEffect(() => {
    if (!posts.length && !error) {
      dispatch(fetchPostsAction());
    }
  }, [dispatch, error, posts.length]);

  if (error) {
    toast.error(error.message, {
      toastId: 'fetch-posts',
    });
  }

  if (loading) {
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
      {posts?.map((post, idx) => (
        <Post
          key={idx}
          showHeader
          {...post}
        />
      ))}
    </>
  );
};
