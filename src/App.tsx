import { Button } from '@mui/material';

import { asyncToggleTheme } from './app/slices/themeSlice';
import { useAppDispatch, useAppSelector } from './hooks/store';
import ThemeProvider from './theme';

const App = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((s) => s.theme.darkMode);

  return (
    <ThemeProvider>
      <Button
        onClick={() => dispatch(asyncToggleTheme())}
        variant="contained"
      >
        Theme {isDarkMode ? 'dark' : 'light'}
      </Button>
    </ThemeProvider>
  );
};

export default App;
