import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayoyut from './layouts/mainLayoyut';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import CategoryPage from './pages/CategoryPage';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayoyut />}>
            <Route index element={<LandingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path='/detail' element={<DetailPage />} />
            <Route path="/detail/:name" element={<DetailPage />} />
            <Route path='/category' element={<CategoryPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
