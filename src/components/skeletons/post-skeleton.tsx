import { Divider, Skeleton, Stack } from '@mui/material';

export const PostSkeleton = () => (
  <Stack
    spacing={3}
    px={2}
  >
    <Stack
      direction="row"
      columnGap={1}
      alignItems="center"
    >
      <Skeleton
        variant="circular"
        width={40}
        height={40}
      />
      <Skeleton
        variant="text"
        sx={{ fontSize: '1rem', width: '100%', maxWidth: '200px', py: 2 }}
      />
    </Stack>

    <Stack
      direction="row"
      justifyContent="space-between"
      columnGap={5}
    >
      <Stack sx={{ width: '60%', maxWidth: '480px' }}>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </Stack>

      <Skeleton
        variant="rectangular"
        width="20%"
        height={100}
      />
    </Stack>

    <Stack
      direction="row"
      justifyContent="space-between"
    >
      <Skeleton
        animation="wave"
        height={10}
        width="40%"
      />
      <Skeleton
        animation="wave"
        height={10}
        width="15%"
      />
    </Stack>
    <Divider />
  </Stack>
);
