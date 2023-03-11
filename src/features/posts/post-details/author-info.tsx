import { Avatar, Box, Stack, Typography } from '@mui/material';

type Props = {
  name: string;
  followers: number;
  avatar: string;
  bio: string;
  address: string;
  joined: string;
};

export const AuthorInfo = (props: Partial<Props>) => {
  const { avatar, followers, name, address, bio, joined } = props;

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
      </Stack>
    </Box>
  );
};
