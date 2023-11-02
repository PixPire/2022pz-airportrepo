import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './navbarComponents/App';
import Clock from './components/Clock';
import { ShoppingCartContextProvider } from './context/ShoppingCartContext';

// styles
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
      <ShoppingCartContextProvider>
        <>
          <Clock />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </>
      </ShoppingCartContextProvider>
);

document.title = 'Lotnisko';