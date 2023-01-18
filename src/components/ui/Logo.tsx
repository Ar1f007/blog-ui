import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.webp';
import { createSXCollection } from '../../utils/mui';

const styles = createSXCollection({
  logo: {
    width: '100%',
    aspectRatio: 1,
    objectFit: 'contain',
  },
});

const Logo = () => (
  <Link to="/">
    <Box
      component="img"
      src={logo}
      alt="logo"
      sx={styles.logo}
    />
  </Link>
);
export default Logo;
