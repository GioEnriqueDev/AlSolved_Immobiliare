import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import '../App.css';
import SellPage from '../pages/SellPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SellPage />
  </StrictMode>
);
