import { IconButton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { isPostLikedAction } from '../../../app/slices/posts/actions';
import { useAddReactionToPostMutation } from '../../../app/slices/posts/postInfoApi';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import Icons from '../../../utils/icons';
import AuthCard from '../../authentication/components/auth-modal';

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

export const Reaction = () => {
  const user = useAppSelector((s) => s.user.data);

  const currentlyViewedPost = useAppSelector((s) => s.post.currentlyViewedPost);
  const dispatch = useAppDispatch();

  const [addReactionToPost, { isError }] = useAddReactionToPostMutation();

  const [showPopup, setShowPopup] = useState(false);
  const [isLiked, setIsLiked] = useState<boolean>();

  async function isLikedPostQuery() {
    if (!user?.id) {
      setIsLiked(false);
      return;
    }

    try {
      const data = await dispatch(
        isPostLikedAction({
          postId: currentlyViewedPost?.post.id,
          userId: user?.id,
        }),
      ).unwrap();

      setIsLiked(data.isLiked);
    } catch (error) {
      //
    }
  }

  function handleOnClickHeart() {
    if (!user) {
      setShowPopup(true);
      return;
    }

    if (!currentlyViewedPost) return;

    const data = {
      userId: user.id,
      postId: currentlyViewedPost.post.id,
    };
    addReactionToPost(data);

    setIsLiked((prev) => !prev);
  }

  function handlePopupClose() {
    setShowPopup(false);
  }

  useEffect(() => {
    isLikedPostQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isError) {
      setIsLiked((prev) => !prev);
    }
  }, [isError]);

  return (
    <>
      <Stack sx={styles.common}>
        <IconButton
          aria-label="Like"
          onClick={() => handleOnClickHeart()}
        >
          {isLiked ? (
            <Icons.Favorite color="error" />
          ) : (
            <Icons.FavoriteBorder />
          )}
        </IconButton>

        <Typography sx={styles.count}>
          {currentlyViewedPost?.post.likesCount}
        </Typography>
      </Stack>

      <AuthCard
        open={showPopup}
        onClose={handlePopupClose}
      />
    </>
  );
};
