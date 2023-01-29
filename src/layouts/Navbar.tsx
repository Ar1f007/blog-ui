import { AppBar, Box, Chip, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

import Logo from '../components/ui/Logo';
import { useAppSelector } from '../hooks/store';
import paths from '../routes/paths';
import { createSXCollection } from '../utils/mui';

import NavLinks from './navbar/nav-links';
import SearchBar from './navbar/search';

const styles = createSXCollection({
  logo: {
    width: (t) => t.spacing(15),
    mr: { xs: 2, lg: 0 },
  },
  signUp: {
    ml: 2,
    lineHeight: 1.1,
  },
  login: {
    textDecoration: 'none',
    color: (t) => t.palette.grey['700'],
  },
});

const Navbar = () => {
  const user = useAppSelector((s) => s.user);

  const noUser = user.data === null;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: 'transparent' }}
      >
        <Toolbar>
          {/* Logo */}
          <Box sx={styles.logo}>
            <Logo />
          </Box>

          <SearchBar />

          <Box sx={{ flexGrow: 1 }} />

          {/* Right side */}

          {noUser ? (
            <>
              <Box
                component={Link}
                to={paths.login}
                sx={styles.login}
              >
                Login
              </Box>
              <Box
                component={Link}
                to={paths.signUp}
                sx={styles.login}
              >
                <Chip
                  color="success"
                  label="Get Started"
                  sx={styles.signUp}
                  clickable
                />
              </Box>
            </>
          ) : (
            <NavLinks />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
