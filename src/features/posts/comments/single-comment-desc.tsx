import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

import { useGetSingleCommentQuery } from '../../../app/slices/comments';
import paths from '../../../routes/paths';

import Comment from './comment-item';

export const SingleCommentDesc = () => {
  const params = useParams();

  const { postSlug, commentId } = params;

  const { isLoading, data, isError } = useGetSingleCommentQuery(commentId, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <>Loading</>;
  }

  if (isError) {
    return (
      <Container
        sx={{ my: 5 }}
        maxWidth="md"
      >
        <Paper sx={{ p: 3 }}>
          <Typography
            variant="h6"
            textAlign="center"
          >
            Sorry! Either the comment does not exist or got deleted by the user
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              component={Link}
              to={paths.home}
              sx={{
                mt: 3,
              }}
            >
              Go back to Home
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <>
      <Container sx={{ my: 5 }}>
        <Paper sx={{ p: 3 }}>
          <Button
            component={Link}
            to={paths.posts + '/' + postSlug}
            variant="outlined"
            sx={{
              mb: 3,
            }}
          >
            View Post
          </Button>
          <Comment {...data?.comment} />
        </Paper>
      </Container>
    </>
  );
};
