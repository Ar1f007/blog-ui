import { Avatar, Box, Button, Stack, Typography } from '@mui/material';

import { useAppSelector } from '../../../hooks/store';

import { FollowBtn } from './follow';

type Props = {
  name: string;
  followers: number;
  avatar: string;
  bio: string;
  address: string;
  joined: string;
  authorId: string;
};

export const AuthorInfo = (props: Partial<Props>) => {
  const { avatar, followers, name, address, bio, joined, authorId } = props;

  return (
    <Box>
      <Stack rowGap={1}>
        <Stack rowGap={1.5}>
          <Avatar
            src={avatar}
            alt={name}
            sx={{ width: 90, height: 90 }}
            variant="rounded"
          />
          <Typography
            variant="h6"
            component="h2"
          >
            {name}
          </Typography>

          {!!followers && (
            <Typography color="primary">
              {followers}

              {followers > 1 ? 'Followers' : 'Follower'}
            </Typography>
          )}
        </Stack>

        <Typography variant="caption">{bio}</Typography>

        {address && (
          <Stack>
            <Typography
              variant="h6"
              component="h3"
            >
              LOCATION
            </Typography>
            <Typography>{address}</Typography>
          </Stack>
        )}

        <Stack>
          <Typography
            variant="h6"
            component="h3"
          >
            JOINED
          </Typography>
          <Typography>{joined}</Typography>
        </Stack>

        <FollowBtn />
      </Stack>
    </Box>
  );
};
