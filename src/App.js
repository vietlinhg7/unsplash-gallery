import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PhotoList from './components/PhotoList';
import PhotoDetail from './components/PhotoDetail';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PhotoList />} />
        <Route path="/photos/:id" element={<PhotoDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
