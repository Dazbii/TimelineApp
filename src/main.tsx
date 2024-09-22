import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import '@fontsource/inter';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssVarsProvider defaultMode='dark'>
      <App />
    </CssVarsProvider>
  </StrictMode>,
);
