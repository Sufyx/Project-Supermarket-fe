
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import './App.css';
import ProductGrid from './components/ProductGrid';
import ShoppingCart from './components/ShoppingCart';
import ProductsFilter from './components/ProductsFilter';


function App() {
  return (
    <div className="App">
      <NavBar />
      
      <ProductsFilter />
      
      <div className="mainContent">
        <ShoppingCart />
        <ProductGrid />
      </div>

      <Routes >
        <Route path="/home" element={<App />} />
      </Routes>

    </div>
  );
}

export default App;
