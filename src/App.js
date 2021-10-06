import './App.css';
import React, { useState, useEffect } from 'react'
import Add from './components/Add';
import Header from './components/Header';
import List from './components/List';

function App() {
  const [contacts, setContacts] = useState([])

  const handleAddContact = (contact) => {
    console.log(contact)
    setContacts([...contacts, contact])
  }
  


  return (
    <div className="ui container">
      <Header />
      <Add handleAddContact={handleAddContact} />
      <List contacts={contacts} />
    </div>
  );
}

export default App;
