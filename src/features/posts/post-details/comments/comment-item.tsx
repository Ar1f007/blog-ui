import {
  Avatar,
  Divider,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
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

  const commenterInfo = (
    <Paper sx={{ p: 3 }}>
      <Stack rowGap={1.5}>
        <Stack
          direction="row"
          columnGap={1}
          alignItems="center"
        >
          <Avatar
            alt={fullName}
            src={photo}
          />

          <Typography fontWeight={500}>{fullName}</Typography>
        </Stack>

        <Typography variant="body2">{bio}</Typography>
      </Stack>
    </Paper>
  );

  return (
    <Stack rowGap={2}>
      {/* Avatar and user info */}
      <Stack
        direction="row"
        columnGap={1}
      >
        <Tooltip
          title={commenterInfo}
          arrow
        >
          <Avatar
            alt={fullName}
            src={photo}
          />
        </Tooltip>

        <Stack>
          <Typography
            fontWeight={500}
            component={Link}
            to={`/${username}`}
            className="user-link"
          >
            {fullName}
          </Typography>
          <Typography
            component={Link}
            variant="caption"
            to={postSlug + paths.comments + '/' + _id}
            className="user-link"
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
