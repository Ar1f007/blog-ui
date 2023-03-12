import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Dialog } from '../../../components';
import Logo from '../../../components/ui/Logo';
import paths from '../../../routes/paths';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AuthCard = ({ open, onClose }: Props) => {
  const navigate = useNavigate();

  function handleOnLoginOrCreateAccountClick(type: 'login' | 'sign-up') {
    switch (type) {
      case 'login':
        navigate(paths.login);
        break;

      case 'sign-up':
        navigate(paths.signUp);
        break;

      default:
        navigate(paths.login);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle textAlign="center">Login to Continue</DialogTitle>
      <DialogContent>
        <Box
          width={{
            xs: '50%',
            lg: '30%',
          }}
          mx="auto"
        >
          <Logo />
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 1,
          width: {
            xs: '80%',
            md: '70%',
          },
          mx: 'auto',
          pb: 3,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={() => handleOnLoginOrCreateAccountClick('login')}
        >
          Login
        </Button>
        <Button
          fullWidth
          variant="text"
          onClick={() => handleOnLoginOrCreateAccountClick('sign-up')}
        >
          Create Account
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AuthCard;
