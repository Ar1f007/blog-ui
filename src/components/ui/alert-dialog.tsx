import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

import { Dialog } from './dialog';
import { CircularLoader } from './loaders/circular-progress';

import type { AlertDialogProps } from '../../types';

export const AlertDialog = (props: AlertDialogProps) => {
  const {
    loader,
    onClose,
    onConfirm,
    open,
    subTitle,
    title,
    confirmBtnText,
    cancelBtnText,
  } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{title ?? 'Are you sure you?'}</DialogTitle>
      <DialogContent>
        {subTitle ?? 'Note: This action cannot be reversed.'}
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          color="inherit"
        >
          {cancelBtnText ?? 'Cancel'}
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          disabled={loader}
          color="error"
        >
          <CircularLoader isLoading={loader} />
          {confirmBtnText ?? 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
