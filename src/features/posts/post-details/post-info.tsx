import { Box, IconButton, Stack, Typography } from '@mui/material';
import { shallowEqual } from 'react-redux';

import { useGetTotalReactionsQuery } from '../../../app/slices/posts/postInfoApi';
import { useAppSelector } from '../../../hooks/store';
import Icons from '../../../utils/icons';

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

  const { isLoading, data } = useGetTotalReactionsQuery(post?.id ?? '', {
    skip: !post?.id,
  });

  function handleOnClickHeart() {
    return;
  }

  if (isLoading) return null;

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

          <Typography sx={styles.count}>{data?.totalReactions}</Typography>
        </Stack>

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
