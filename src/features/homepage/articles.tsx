import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { fetchPostsAction } from '../../app/slices/posts';
import { Post } from '../../components/ui/post-card';
import { useAppDispatch, useAppSelector } from '../../hooks/store';

export const Articles = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((s) => s.post);

  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchPostsAction());
    }
  }, [dispatch, posts]);

  if (error) {
    toast.error(error.message, {
      toastId: 'fetch-posts',
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {posts.map((post) => (
        <Post
          key={post.id}
          showHeader
          {...post}
        />
      ))}
    </>
  );
};
