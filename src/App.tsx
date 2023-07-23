
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import './App.css';


function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes >
        <Route path="/home" element={<App />} />
      </Routes>

    </div>
  );
}

export default App;
