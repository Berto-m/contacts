import './App.css';
import React, { useState, useEffect } from 'react'
import Add from './components/Add';
import Header from './components/Header';
import List from './components/List';

function App() {
	const STORAGE_KEY = 'contacts';
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		// get contacts when refreshing the page hence the empty dependency
    // convert data from string to object and sets it as the state (contacts)
		const getContacts = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(getContacts) {
      setContacts(getContacts);
    }
	}, []);

  useEffect(() => {
			// localStorage only read strings hence JSON.stringify
			localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
		}, [contacts]);

	const handleAddContact = (contact) => {
		console.log(contact);
		setContacts([...contacts, contact]);
	};

	return (
		<div className='ui container'>
			<Header />
			<Add handleAddContact={handleAddContact} />
			<List contacts={contacts} />
		</div>
	);
}

export default App;
