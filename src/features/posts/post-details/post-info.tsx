import { Box, IconButton, Stack, Typography } from '@mui/material';
import { shallowEqual } from 'react-redux';

import { useAppSelector } from '../../../hooks/store';
import Icons from '../../../utils/icons';

import { Reaction } from './reaction';

type Props = {
  bookmarksCount?: number | undefined;
};

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
export const PostInfo = (props: Props) => {
  const { bookmarksCount } = props;

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

        <Stack sx={styles.common}>
          <IconButton aria-label="Bookmark">
            <Icons.BookmarkAddOutlined />
          </IconButton>

          <Typography sx={styles.count}>{bookmarksCount}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};
