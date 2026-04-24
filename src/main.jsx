import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { PatientAuthProvider } from './context/PatientAuthContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PatientAuthProvider>
        <App />
      </PatientAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
