// Types for UI components

export type StatCardProps = {
  title: string;
  total: number;
};

export type AlertDialogProps = {
  title?: string;
  subTitle?: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loader: boolean;
  confirmBtnText?: string;
  cancelBtnText?: string;
};
