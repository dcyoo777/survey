import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './view/style/reset.scss'
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
