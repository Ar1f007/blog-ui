import { IconButton, Stack } from '@mui/material';
import { useState } from 'react';
import { shallowEqual } from 'react-redux';

import {
  useCreateOrRemoveBookmarkMutation,
  useIsBookmarkedQuery,
} from '../../../app/slices/posts/postInfoApi';
import { useAppSelector } from '../../../hooks/store';
import Icons from '../../../utils/icons';
import AuthCard from '../../authentication/components/auth-modal';

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

  const [showPopup, setShowPopup] = useState(false);

  async function handleOnBookmarkClick() {
    if (!user) {
      setShowPopup(true);
      return;
    }

    if (!post) return;

    // toggle bookmark > mark/un-mark
    await createOrRemove({ postId: post.id, userId: user.id });
  }

  function handlePopupClose() {
    setShowPopup(false);
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
      <AuthCard
        open={showPopup}
        onClose={handlePopupClose}
      />
    </Stack>
  );
};
