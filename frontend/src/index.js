import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

// Adicionando o fonte Inter
const inter = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = inter;
document.head.appendChild(link);

// Adicionando o Font Awesome
const fontAwesome = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
const faLink = document.createElement('link');
faLink.rel = 'stylesheet';
faLink.href = fontAwesome;
document.head.appendChild(faLink);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);