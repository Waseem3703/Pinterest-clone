import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { PinProvider } from './context/PinContext.jsx';
import { HelmetProvider } from 'react-helmet-async'; // ✅ Import HelmetProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider> {/* ✅ Wrap entire app */}
      <UserProvider>
        <PinProvider>
          <App />
        </PinProvider>
      </UserProvider>
    </HelmetProvider>
  </StrictMode>
);
