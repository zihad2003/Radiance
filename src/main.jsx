import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ToastProvider } from './context/ToastContext';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ui/ErrorBoundary';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <ConvexProvider client={convex}>
          <ToastProvider>
            <App />
          </ToastProvider>
        </ConvexProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>,
)
