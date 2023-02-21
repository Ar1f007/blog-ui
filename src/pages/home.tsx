import { Container, Grid } from '@mui/material';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { fetchPostsAction } from '../app/slices/posts';
import { Post } from '../components/ui/post-card';
import { RightSidebar } from '../features/homepage';
import { useAppDispatch, useAppSelector } from '../hooks/store';

export const Home = () => {
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
    <Container>
      <Grid
        container
        spacing={5}
      >
        <Grid
          item
          xs={12}
          lg={8}
        >
          {posts.map((post) => (
            <Post
              key={post.id}
              showHeader
              title={post.title}
              description={post.description}
              category={post.category}
              coverImage={post.coverImage}
              likesCount={post.likesCount}
              author={post.authorId}
            />
          ))}
        </Grid>

        <Grid
          item
          lg={4}
        >
          <RightSidebar />
        </Grid>
      </Grid>
    </Container>
  );
};
