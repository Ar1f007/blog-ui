import { Box, IconButton, Stack, Typography } from '@mui/material';
import { shallowEqual } from 'react-redux';

import { useAppSelector } from '../../../hooks/store';
import Icons from '../../../utils/icons';

import { Bookmark } from './bookmark';
import { Reaction } from './reaction';

const styles = {
  common: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontWeight: 'bold',
    color: 'grey.main',
  },
};
export const PostInfo = () => {
  const post = useAppSelector(
    (s) => s.post?.currentlyViewedPost?.post,
    shallowEqual,
  );

  return (
    <Box>
      <Stack
        sx={styles.common}
        rowGap={3}
      >
        <Reaction />

        <Stack sx={styles.common}>
          <IconButton aria-label="Comment">
            <Icons.Comment />
          </IconButton>

          <Typography sx={styles.count}>{post?.totalComments}</Typography>
        </Stack>

        <Bookmark />
      </Stack>
    </Box>
  );
};
