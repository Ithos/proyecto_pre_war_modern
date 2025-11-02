import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'mana-font/css/mana.css';
import 'keyrune/css/keyrune.css';
import App from './App';
import { DataProvider } from './Context/DataContext';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/*" element={ <DataProvider> <App /> </DataProvider>} />
      </Routes>
    </Router>
  </React.StrictMode>
);

