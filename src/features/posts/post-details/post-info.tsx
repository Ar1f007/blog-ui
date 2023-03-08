import { Box, IconButton, Stack, Typography } from '@mui/material';

import Icons from '../../../utils/icons';

type Props = {
  likesCount: number;
  commentsCount: number;
  bookmarksCount?: number;
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
  const { likesCount, commentsCount, bookmarksCount } = props;

  return (
    <Box>
      <Stack
        sx={styles.common}
        rowGap={3}
      >
        <Stack sx={styles.common}>
          <IconButton aria-label="Like">
            <Icons.FavoriteBorder />
          </IconButton>

          <Typography sx={styles.count}>{likesCount}</Typography>
        </Stack>

        <Stack sx={styles.common}>
          <IconButton aria-label="Comment">
            <Icons.Comment />
          </IconButton>

          <Typography sx={styles.count}>{commentsCount}</Typography>
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
