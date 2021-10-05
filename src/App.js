import './App.css';
import React, { useState, useEffect } from 'react'
import Add from './components/Add';
import Header from './components/Header';
import List from './components/List';

function App() {
  return (
    <div className="App">
      <Header />
      <Add />
      <List />
    </div>
  );
}

export default App;
