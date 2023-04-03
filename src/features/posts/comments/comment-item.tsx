import { Avatar, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import paths from '../../../routes/paths';
import { parseHTMLToString } from '../../../utils';
import { formatTimeFromNow } from '../../../utils/dateTime';

import type { Comment } from '../../../app/slices/comments/types';

import { CommentDropDownIcon } from './comment-dropdown';

type Props = {
  postSlug: string;
} & Comment;

const CommentItem = (props: Props) => {
  const { _id, commentDesc, updatedAt, postSlug, commenter } = props;
  const {
    bio,
    firstName,
    lastName,
    active,
    photo,
    id: userId,
    username,
  } = commenter;

  if (!active) {
    return null;
  }

  const pathToComment = postSlug + paths.comments + '/' + _id;

  const fullName = firstName + ' ' + lastName;

  const commenterInfo = (
    <Paper sx={{ p: 3 }}>
      <Stack rowGap={1.5}>
        <Stack
          direction="row"
          columnGap={1}
          alignItems="center"
        >
          <Avatar
            alt={firstName}
            src={photo}
          />

          <Typography fontWeight={500}>
            {firstName}&nbsp;{lastName}
          </Typography>
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
          className="comment-tooltip"
        >
          <Avatar
            alt={firstName}
            src={photo}
            sx={{ mt: 1 }}
          />
        </Tooltip>

        <Stack
          sx={{
            boxShadow: '0 0 0 1px rgba(23, 23, 23, 0.1)',
            borderRadius: 1,
            p: 2,
            pb: 0,
            flex: 1,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
          >
            <Stack>
              <Typography
                fontWeight={500}
                component={Link}
                to={`/${username}`}
                className="user-link"
              >
                {firstName}&nbsp;{lastName}
              </Typography>
              <Typography
                component={Link}
                variant="caption"
                to={pathToComment}
                className="user-link"
              >
                {formatTimeFromNow(updatedAt)}
              </Typography>
            </Stack>

            <CommentDropDownIcon
              pathToComment={pathToComment}
              commenterName={fullName}
              comment={commentDesc}
              commentId={_id}
              currentUserId={userId}
            />
          </Stack>

          {/* Comment */}
          <Typography
            fontSize="1.6rem"
            lineHeight={1.8}
            component="div"
            className="htmlString"
          >
            {parseHTMLToString(commentDesc)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default CommentItem;
