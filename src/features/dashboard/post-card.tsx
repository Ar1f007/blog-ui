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

import { CircularLoader } from '../../components';
import paths from '../../routes/paths';
import Icons from '../../utils/icons';

import type { Post } from '../../app/slices/posts/types';
import type { MouseEvent } from 'react';

export const PostCard = (props: Post) => {
  const { slug, coverImage, title } = props;
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const open = Boolean(anchorEl);

  function handleClick(e: MouseEvent<HTMLElement>) {
    setAnchorEl(e.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function navigateToPost(slug: string) {
    navigate(paths.posts + '/' + slug);
  }

  function handleDeleteComment() {
    setShowAlertDialog(true);
    handleClose();
    return;
  }

  function closeAlertDialog() {
    setShowAlertDialog(false);
  }

  function handleOnConfirmDelete() {
    //  deleteComment(commentId);
    alert(slug);
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
          onClick={() => navigateToPost(slug)}
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
                <MenuItem
                  aria-label="view post"
                  onClick={() => navigateToPost(slug)}
                >
                  View
                </MenuItem>

                <MenuItem
                  aria-label="Edit post"
                  onClick={() => navigateToPost(slug)}
                >
                  Edit
                </MenuItem>

                <MenuItem
                  aria-label="delete post"
                  onClick={() => handleDeleteComment()}
                >
                  Delete
                </MenuItem>
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
            // disabled={isLoading}
          >
            {/* <CircularLoader isLoading={isLoading} /> */}
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
