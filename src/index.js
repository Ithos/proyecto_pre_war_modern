import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'mana-font/css/mana.css';
import 'keyrune/css/keyrune.css';
import App from './App';
import { DataProvider } from './Context/DataContext';
import { BrowserRouter as Router} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <DataProvider>
        <App />
      </DataProvider>
    </Router>
  </React.StrictMode>
);

