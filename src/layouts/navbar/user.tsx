import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { getUserData, logout } from '../../app/slices/users/slice';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { userNavigation } from '../../routes/navigation';
import Icons from '../../utils/icons';
import { createSXCollection } from '../../utils/mui';

const styles = createSXCollection({
  menu: {
    mt: '45px',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: (t) => t.palette.grey['900'],
  },
});

const UserSettings = () => {
  const user = useAppSelector(getUserData);
  const dispatch = useAppDispatch();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(logout());
  };

  return (
    <Box flexGrow={0}>
      <Tooltip title="Open settings">
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{ p: 0 }}
        >
          <Avatar
            alt={user?.firstName}
            src={user?.photo}
          />
        </IconButton>
      </Tooltip>

      <Menu
        sx={{
          mt: '45px',
        }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          onClick={handleCloseUserMenu}
          sx={{ width: '200px' }}
        >
          <Box
            component={Link}
            to={`/${user?.username}`}
            sx={styles.link}
          >
            <ListItemIcon>
              <Icons.PermIdentity />
            </ListItemIcon>
            Profile
          </Box>
        </MenuItem>
        {userNavigation.map((userMenu) => (
          <MenuItem
            key={userMenu.name}
            onClick={handleCloseUserMenu}
          >
            <Box
              component={Link}
              to={userMenu.href}
              sx={styles.link}
            >
              <ListItemIcon>
                <userMenu.icon />
              </ListItemIcon>
              {userMenu.name}
            </Box>
          </MenuItem>
        ))}

        <Divider />

        <MenuItem
          onClick={handleLogout}
          sx={styles.link}
        >
          <ListItemIcon>
            <Icons.Logout />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};
export default UserSettings;
