import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';

import { store } from './app/store';
import App from './App';

ReactDOM.createRoot(
  document.getElementById('root')!,
).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
  <CssBaseline />
  <App />
</ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);