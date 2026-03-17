import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import '../App.css';
import InvestPage from '../pages/InvestPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InvestPage />
  </StrictMode>
);
