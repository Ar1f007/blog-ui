import { Box, IconButton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { shallowEqual } from 'react-redux';

import { isPostLikedAction } from '../../../app/slices/posts/actions';
import { useAddReactionToPostMutation } from '../../../app/slices/posts/postInfoApi';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import Icons from '../../../utils/icons';
import AuthCard from '../../authentication/components/auth-modal';

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
  const dispatch = useAppDispatch();
  const [showPopup, setShowPopup] = useState(false);

  const post = useAppSelector(
    (s) => s.post?.currentlyViewedPost?.post,
    shallowEqual,
  );

  const user = useAppSelector((s) => s.user.data);

  const [addReactionToPost, { isLoading: addingReaction, data: reactionRes }] =
    useAddReactionToPostMutation();

  function handleOnClickHeart() {
    if (!user) {
      setShowPopup(true);
      return;
    }

    if (!post) return;

    const data = {
      userId: user.id,
      postId: post.id,
    };
    addReactionToPost(data);
  }

  function handlePopupClose() {
    setShowPopup(false);
  }

  useEffect(() => {
    dispatch(
      isPostLikedAction({
        userId: user?.id,
        postId: post?.id,
      }),
    );
  }, []);

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

          <Typography sx={styles.count}>{post?.likesCount}</Typography>
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
      <AuthCard
        open={showPopup}
        onClose={handlePopupClose}
      />
    </Box>
  );
};
