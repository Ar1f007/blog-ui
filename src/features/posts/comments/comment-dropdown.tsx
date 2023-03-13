import { Box, DialogContent, IconButton, Menu, MenuItem } from '@mui/material';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { Dialog } from '../../../components';
import { APP_UI_BASE_URL } from '../../../constant';
import Icons from '../../../utils/icons';

import { EditComment } from './edit-comment';

type Identifier = 'copy-comment-link' | 'edit-comment' | 'delete-comment';
type Options = {
  ariaLabel: string;
  label: string;
  identifier: Identifier;
};

type Props = {
  commenterName: string;
  pathToComment: string;
  commentId: string;
  comment: string;
};
export const CommentDropDownIcon = (props: Props) => {
  const { commenterName, pathToComment, comment, commentId } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const options = useMemo(() => {
    const options: Options[] = [
      {
        ariaLabel: `copy link to ${commenterName}'s comment`,
        label: 'Copy link to comment',
        identifier: 'copy-comment-link',
      },
      {
        ariaLabel: `edit comment`,
        label: 'Edit',
        identifier: 'edit-comment',
      },
      {
        ariaLabel: `delete comment`,
        label: 'Delete',
        identifier: 'delete-comment',
      },
    ];

    return options;
  }, [commenterName]);

  const open = Boolean(anchorEl);

  function handleCloseEditDialog() {
    setShowEditDialog(false);
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  }

  function handleCopyLinkToComment() {
    navigator.clipboard.writeText(APP_UI_BASE_URL + pathToComment);
    toast.success('Copied to clipboard');
    handleClose();
    return;
  }

  function handleEditComment() {
    setShowEditDialog(true);

    handleClose();
    return;
  }

  function closeEditCommentDialog() {
    setShowEditDialog(false);
  }

  function handleDeleteComment() {
    handleClose();
    return;
  }

  function handleDropdownClick(identifier: Identifier) {
    switch (identifier) {
      case 'copy-comment-link':
        handleCopyLinkToComment();
        break;

      case 'edit-comment':
        handleEditComment();
        break;

      case 'delete-comment':
        handleDeleteComment();
        break;

      default:
        return;
    }
  }

  return (
    <Box>
      <IconButton
        aria-label="Toggle dropdown menu"
        aria-haspopup="true"
        id="comment-dropdown-menu"
        aria-controls={open ? 'comment-dropdown' : undefined}
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Icons.MoreHoriz />
      </IconButton>

      <Menu
        id="comment-dropdown"
        MenuListProps={{ 'aria-labelledby': 'comment-dropdown-menu' }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.identifier}
            aria-label={option.ariaLabel}
            onClick={() => handleDropdownClick(option.identifier)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>

      <Dialog
        open={showEditDialog}
        onClose={handleCloseEditDialog}
        fullWidth
      >
        <DialogContent>
          <EditComment
            content={comment}
            commentId={commentId}
            closeDialog={closeEditCommentDialog}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};
