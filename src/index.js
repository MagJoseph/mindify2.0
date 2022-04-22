import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css';
import App from './App';

// export const apiUrl = process.env.NODE_ENV === 'production' ? 'https://mighty-wildwood-47895.herokuapp.com/' : 'http://localhost:3001/'
export const environment = {
  production: true,
  apiUrl: "https://mighty-wildwood-47895.herokuapp.com/"
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

