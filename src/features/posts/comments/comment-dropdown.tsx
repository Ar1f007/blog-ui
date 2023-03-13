import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

import Icons from '../../../utils/icons';

const options = ['Copy link', 'Edit', 'Delete'];

export const CommentDropDownIcon = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
        aria-label="Toggle dropdown menu"
        aria-haspopup="true"
        id="long-button"
        aria-controls={open ? 'comment-dropdown' : undefined}
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Icons.MoreHoriz />
      </IconButton>

      <Menu
        id="comment-dropdown"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
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
            key={option}
            onClick={handleClose}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
