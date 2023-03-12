import { Avatar, Divider, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import paths from '../../../../routes/paths';
import { formatTimeFromNow } from '../../../../utils/dateTime';

import type { Comment } from '../../../../app/slices/comments/type';

type Props = {
  postSlug: string;
} & Comment;

const CommentItem = (props: Props) => {
  const { _id, commentDesc, user, updatedAt, postSlug } = props;
  const { username, bio, fullName, photo } = user;

  return (
    <Stack rowGap={2}>
      {/* Avatar and user info */}
      <Stack
        direction="row"
        columnGap={1}
      >
        <Avatar
          src={photo}
          alt={fullName}
        />

        <Stack>
          <Typography fontWeight={500}>{fullName}</Typography>
          <Typography
            component={Link}
            variant="caption"
            to={postSlug + paths.comments + '/' + _id}
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': {
                textDecoration: 'underline',
                color: 'primary.main',
              },
            }}
          >
            {formatTimeFromNow(updatedAt)}
          </Typography>
        </Stack>
      </Stack>

      {/* Comment */}
      <Typography
        fontSize="1.6rem"
        lineHeight={1.8}
      >
        {commentDesc}
      </Typography>

      <Divider />
    </Stack>
  );
};
export default CommentItem;
