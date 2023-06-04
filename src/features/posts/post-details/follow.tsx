import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
  useFollowUserMutation,
  useGetMyDetailsQuery,
  useUnfollowUserMutation,
} from '../../../app/slices/users/users-api';
import { useAppSelector } from '../../../hooks/store';
import AuthCard from '../../authentication/components/auth-modal';

export const FollowBtn = () => {
  const userId = useAppSelector((s) => s.user.data?.id);
  const { isLoading: userDetailsLoading, data } = useGetMyDetailsQuery(
    userId ?? '',
    {
      skip: !userId,
      refetchOnMountOrArgChange: true,
    },
  );

  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  const authorId = useAppSelector((s) => s.post.currentlyViewedPost?.author.id);

  const [popup, setPopup] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  function closePopup() {
    setPopup(false);
  }

  async function handleOnFollowClick() {
    try {
      setActionLoading(true);

      if (isFollowing) {
        await unfollowUser(authorId);
      } else {
        await followUser(authorId);
      }

      setIsFollowing(!isFollowing);
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setActionLoading(false);
    }
  }

  useEffect(() => {
    if (!userDetailsLoading) {
      const isFollowing = data?.user.following.find(
        (userId) => userId === authorId,
      );
      setIsFollowing(!!isFollowing);
    }
  }, [data, authorId, userDetailsLoading]);

  if (userDetailsLoading) {
    return null;
  }

  if (!userId) {
    return (
      <>
        <Button
          variant="contained"
          color="success"
          sx={{ width: 'fit-content', px: 2, mt: 1 }}
          onClick={() => setPopup(true)}
        >
          Follow
        </Button>

        <AuthCard
          open={popup}
          onClose={closePopup}
        />
      </>
    );
  }

  return (
    <Button
      variant="contained"
      color="success"
      sx={{ width: 'fit-content', px: 2, mt: 1 }}
      disabled={actionLoading}
      onClick={handleOnFollowClick}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};
