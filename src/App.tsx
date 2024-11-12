import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/nav';
import Products from './components/products';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

function App() {
  return (
    <div className="App">
      <Products />
    </div>
  );
}

export default App;
