import { Dialog as MuiDialog } from '@mui/material';

import { Transition } from './transition';

import type { ReactNode } from 'react';

type Props = {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
};

export const Dialog = ({ open, children, onClose }: Props) => (
  <MuiDialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={onClose}
    aria-describedby="Login to continue"
  >
    {children}
  </MuiDialog>
);
