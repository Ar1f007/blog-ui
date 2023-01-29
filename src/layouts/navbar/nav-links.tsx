import { Badge, Box, IconButton } from '@mui/material';

import Icons from '../../utils/icons';

import UserSettings from './user';

const NavLinks = () => (
  <>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
      >
        <Badge
          badgeContent={17}
          color="error"
        >
          <Icons.Notifications sx={{ fontSize: '3rem' }} />
        </Badge>
      </IconButton>

      <UserSettings />
    </Box>
  </>
);
export default NavLinks;
