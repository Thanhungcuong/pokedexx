import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayoyut from './layouts/mainLayoyut';
import LandingPage from './pages/LandingPage';
import DetailPage from './pages/DetailPage';
import CategoryPage from './pages/CategoryPage';
import LocationPage from './pages/LocationPage';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayoyut />}>
            <Route index element={<LandingPage />} />
            <Route path="/detail/:name" element={<DetailPage />} />
            <Route path='/category/:type' element={<CategoryPage />} />
            <Route path="/location/:location" element={<LocationPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
