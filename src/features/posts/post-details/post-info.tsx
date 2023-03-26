import { Box, IconButton, Stack, Typography } from '@mui/material';
import { shallowEqual } from 'react-redux';

import { useCreateOrRemoveBookmarkMutation } from '../../../app/slices/posts/postInfoApi';
import { useAppSelector } from '../../../hooks/store';
import Icons from '../../../utils/icons';

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

  const user = useAppSelector((s) => s.user.data);

  const [createOrRemove] = useCreateOrRemoveBookmarkMutation();

  async function handleOnBookmarkClick() {
    if (!post || !user) return;

    // toggle bookmark > mark/un-mark
    await createOrRemove({ postId: post.id, userId: user.id });
  }

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
          <IconButton
            aria-label="Bookmark"
            onClick={() => handleOnBookmarkClick()}
          >
            {post?.isBookmarked ? (
              <Icons.BookmarkOutlined />
            ) : (
              <Icons.BookmarkAddOutlined />
            )}
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};
