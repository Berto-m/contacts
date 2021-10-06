import './App.css';
import React, { useState, useEffect } from 'react'
import Add from './components/Add';
import Header from './components/Header';
import List from './components/List';

function App() {
  const [contacts, setContacts] = useState([])


  return (
    <div className="ui container">
      <Header />
      <Add />
      <List contacts={contacts} />
    </div>
  );
}

export default App;
