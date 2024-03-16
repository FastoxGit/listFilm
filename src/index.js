import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js.map";
import './css/index.css';
import Header from './js/pages/header.tsx';
import Footer from './js/assets/footer.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';

import menus from './js/menus.tsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className="App">
    <React.StrictMode>
      <Header />
      <Router>
        <Routes>
          {menus.map((menu, i) => (
            <Route key={i} path={menu.path} element={menu.component}></Route>
          ))}
        </Routes>
      </Router>
      <Footer />
    </React.StrictMode>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
