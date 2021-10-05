import './App.css';
import React, { useState, useEffect } from 'react'
import Add from './components/Add';
import Header from './components/Header';
import List from './components/List';

function App() {

  const contacts = [
			{
				id: 1,
				name: 'Albert',
				email: 'albert@pm.me',
			},
			{
				id: 2,
				name: 'Steve',
				email: 'steve@pm.me',
			},
			{
				id: 3,
				name: 'Tom',
				email: 'tom@pm.me',
			},
		];


  return (
    <div className="ui container">
      <Header />
      <Add />
      <List contacts={contacts} />
    </div>
  );
}

export default App;
