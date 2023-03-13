import { Dialog as MuiDialog } from '@mui/material';

import { Transition } from './transition';

import type { DialogProps } from '@mui/material';
import type { ReactNode } from 'react';

type Props = {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
} & DialogProps;

export const Dialog = ({ open, children, onClose, ...others }: Props) => (
  <MuiDialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={onClose}
    aria-describedby="Login to continue"
    {...others}
  >
    {children}
  </MuiDialog>
);
