import { Box, IconButton, Stack, Typography } from '@mui/material';

import { useAppSelector } from '../../../hooks/store';
import Icons from '../../../utils/icons';

type Props = {
  likesCount: number | undefined;
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
  const { likesCount, bookmarksCount } = props;
  const totalComments = useAppSelector(
    (s) => s.post?.currentlyViewedPost?.post.totalComments,
  );

  function handleOnClickHeart() {
    return;
  }

  return (
    <Box>
      <Stack
        sx={styles.common}
        rowGap={3}
      >
        <Stack sx={styles.common}>
          <IconButton
            aria-label="Like"
            onClick={() => handleOnClickHeart()}
          >
            <Icons.FavoriteBorder />
          </IconButton>

          <Typography sx={styles.count}>{likesCount}</Typography>
        </Stack>

        <Stack sx={styles.common}>
          <IconButton aria-label="Comment">
            <Icons.Comment />
          </IconButton>

          <Typography sx={styles.count}>{totalComments}</Typography>
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
