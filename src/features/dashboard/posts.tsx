import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { useGetAuthorsPostQuery } from '../../app/slices/posts/postInfoApi';
import { useAppSelector } from '../../hooks/store';
import paths from '../../routes/paths';

import { PostCard } from './post-card';
import Stats from './stats';

export const Posts = () => {
  const userId = useAppSelector((s) => s.user.data?.id);

  const { data } = useGetAuthorsPostQuery(userId || '', {
    skip: !userId,
    refetchOnMountOrArgChange: true,
  });

  const url = useLocation();
  const navigate = useNavigate();

  const currentPath = url.pathname;
  const showStats =
    currentPath === `${paths.dashboard.index}` ? <Stats /> : null;

  return (
    <>
      <Stack rowGap={3}>
        {data?.posts?.length === 0 && (
          <Container
            maxWidth="sm"
            sx={{ py: { lg: 5 } }}
          >
            <Stack
              alignItems="center"
              rowGap={3}
            >
              <Typography
                variant="h5"
                textAlign="center"
              >
                This is where you can manage your posts. But you haven&apos;t
                written anything yet
              </Typography>

              <Button
                onClick={() => navigate(paths.newPost)}
                variant="contained"
              >
                Write your first post now
              </Button>
            </Stack>
          </Container>
        )}

        {data?.posts?.length !== 0 ? (
          <Stack rowGap={6}>
            {showStats}

            <Grid
              container
              spacing={3}
            >
              {data?.posts?.map((post) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  key={post.id}
                >
                  <PostCard
                    key={post.id}
                    {...post}
                  />
                </Grid>
              ))}
            </Grid>
          </Stack>
        ) : null}
      </Stack>
    </>
  );
};
