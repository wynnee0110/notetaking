import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { NotesProvider } from './providers/NotesProvider';
import App from './App';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotesProvider> {/* <--- IF THIS IS MISSING, YOU GET A WHITE SCREEN */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NotesProvider>
  </StrictMode>
);