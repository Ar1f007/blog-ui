import { IconButton, Stack } from '@mui/material';
import { shallowEqual } from 'react-redux';

import {
  useCreateOrRemoveBookmarkMutation,
  useIsBookmarkedQuery,
} from '../../../app/slices/posts/postInfoApi';
import { useAppSelector } from '../../../hooks/store';
import Icons from '../../../utils/icons';

const styles = {
  common: {
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export const Bookmark = () => {
  const post = useAppSelector(
    (s) => s.post?.currentlyViewedPost?.post,
    shallowEqual,
  );

  const user = useAppSelector((s) => s.user.data, shallowEqual);

  useIsBookmarkedQuery(
    { postId: post?.id, userId: user?.id },
    {
      refetchOnMountOrArgChange: true,
      skip: !post?.id || !user?.id,
    },
  );

  const [createOrRemove] = useCreateOrRemoveBookmarkMutation();

  async function handleOnBookmarkClick() {
    if (!post || !user) return;

    // toggle bookmark > mark/un-mark
    await createOrRemove({ postId: post.id, userId: user.id });
  }

  return (
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
  );
};
