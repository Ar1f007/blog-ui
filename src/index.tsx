import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import { store, persistor } from './app/store';
import ThemeProvider from './theme';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </LocalizationProvider>
        </PersistGate>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
);
