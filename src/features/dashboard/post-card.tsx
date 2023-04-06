import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeletePostMutation } from '../../app/slices/posts/postInfoApi';
import { CircularLoader } from '../../components';
import paths from '../../routes/paths';
import Icons from '../../utils/icons';

import type { MenuOptions, Post } from '../../app/slices/posts/types';
import type { MouseEvent } from 'react';

export const PostCard = (props: Post) => {
  const { slug, coverImage, title } = props;
  const [deletePost, { isLoading }] = useDeletePostMutation();
  const navigate = useNavigate();

  const menuOptions: MenuOptions[] = [
    { label: 'View', identifier: 'view-post' },
    { label: 'Edit', identifier: 'edit-post' },
    { label: 'Delete', identifier: 'delete-post' },
  ];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const open = Boolean(anchorEl);

  function handleClick(e: MouseEvent<HTMLElement>) {
    setAnchorEl(e.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleDropdownClick(identifier: MenuOptions['identifier']) {
    switch (identifier) {
      case 'view-post':
        navigateToPost();
        break;

      case 'edit-post':
        handleEditPost();
        break;

      case 'delete-post':
        handleDeletePost();
        break;

      default:
        return;
    }
  }

  function navigateToPost() {
    navigate(paths.posts + '/' + slug);
  }

  function handleEditPost() {
    navigate(paths.editPost, { state: { post: props } });
  }

  function handleDeletePost() {
    setShowAlertDialog(true);
    handleClose();
    return;
  }

  function closeAlertDialog() {
    setShowAlertDialog(false);
  }

  function handleOnConfirmDelete() {
    deletePost(slug);
    return;
  }

  return (
    <>
      <Card sx={{ cursor: 'pointer' }}>
        <CardMedia
          component="img"
          alt="cover image"
          height="140"
          image={coverImage}
          onClick={() => navigateToPost()}
        />

        <CardHeader
          subheader={title}
          action={
            <>
              <IconButton
                aria-label="toggle settings"
                aria-haspopup="true"
                id="settings-dropdown"
                aria-controls={open ? 'post-settings-dropdown' : undefined}
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <Icons.MoreVert />
              </IconButton>
              <Menu
                id="settings-dropdown"
                MenuListProps={{ 'aria-labelledby': 'comment-dropdown-menu' }}
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                {menuOptions.map((option, idx) => (
                  <MenuItem
                    key={idx}
                    aria-label={option.label}
                    onClick={() => handleDropdownClick(option.identifier)}
                    sx={{ px: 4 }}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          }
        />
      </Card>

      <Dialog
        open={showAlertDialog}
        onClose={closeAlertDialog}
      >
        <DialogTitle>Are you sure you?</DialogTitle>
        <DialogContent>Note: This action cannot be reversed.</DialogContent>
        <DialogActions>
          <Button onClick={closeAlertDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleOnConfirmDelete}
            disabled={isLoading}
          >
            <CircularLoader isLoading={isLoading} />
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
