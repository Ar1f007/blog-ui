import { Button } from '@mui/material';
import { useState } from 'react';

import { useGetMyDetailsQuery } from '../../../app/slices/users/users-api';
import { useAppSelector } from '../../../hooks/store';
import AuthCard from '../../authentication/components/auth-modal';
export const FollowBtn = () => {
  const userId = useAppSelector((s) => s.user.data?.id);
  const { isLoading, data } = useGetMyDetailsQuery(userId ?? '', {
    skip: !userId,
  });

  const [popup, setPopup] = useState(false);

  function closePopup() {
    setPopup(false);
  }

  if (isLoading) {
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

  return <div>FollowBtn</div>;
};
