import { CircularProgress } from '@mui/material';

type Props = {
  isLoading: boolean;
};

export const CircularLoader = ({ isLoading }: Props) => {
  if (isLoading) {
    return (
      <CircularProgress
        size={20}
        sx={{
          mr: 1,
        }}
        color="inherit"
      />
    );
  }

  return null;
};
