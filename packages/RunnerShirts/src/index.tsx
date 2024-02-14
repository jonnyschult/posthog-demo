import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom/client';
import App from '~/App.tsx';
import { globalStyles } from '~/shared/styles/global';
import { theme } from '~/shared/styles/theme';
import posthog from 'posthog-js';
import { POSTHOG_API_KEY, POSTHOG_INSTANCE_ADDRESS } from './shared/config';

posthog.init(POSTHOG_API_KEY, {
  api_host: POSTHOG_INSTANCE_ADDRESS,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <GlobalStyles styles={globalStyles} />
    <CssBaseline enableColorScheme />
    <App />
  </ThemeProvider>,
);
