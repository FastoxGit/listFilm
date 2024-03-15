import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './css/index.css';
import Header from './js/pages/header.tsx';
import Home from './js/pages/home.tsx'
import FilmList from './js/pages/filmList.tsx'
import FilmSearch from './js/pages/filmSearch.tsx'
import FilmAdd from './js/pages/filmAdd.tsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className="App">
    <React.StrictMode>
      <Header />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/list' element={<FilmList />} ></Route>
          <Route path='/search' element={<FilmSearch />} ></Route>
          <Route path='/add' element={<FilmAdd />} ></Route>
        </Routes>
      </Router>
    </React.StrictMode>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
