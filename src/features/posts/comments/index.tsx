import { Box, Divider, Stack, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useGetCommentsQuery } from '../../../app/slices/comments';

import { AddComment } from './add-comment';
import CommentItem from './comment-item';

type Props = {
  postId: string;
};

const Comments = ({ postId }: Props) => {
  const { data, isLoading, error } = useGetCommentsQuery(postId, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const location = useLocation();

  if (isLoading) {
    return <>loading...</>;
  }

  if (error) {
    toast.error('Could not load comments, try reloading');
  }

  return (
    <Box
      py={4}
      px={3}
    >
      {data && data?.totalComments > 0 && <Divider sx={{ mb: 4 }} />}

      <Stack rowGap={2}>
        <Typography
          variant="h6"
          component="h4"
          fontWeight={600}
        >
          Comments ({data?.totalComments})
        </Typography>

        <AddComment postId={postId} />

        {data?.comments.map((comment) => (
          <CommentItem
            {...comment}
            key={comment._id}
            postSlug={location.pathname}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Comments;
