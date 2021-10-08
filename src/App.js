import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
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
		if (getContacts) {
			setContacts(getContacts);
		}
	}, []);

	useEffect(() => {
		// localStorage only read strings hence JSON.stringify
		localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
	}, [contacts]);

	const handleAddContact = (contact) => {
		console.log(contact);
		// use the uuid v4 package to generade uniquie IDs
		setContacts([...contacts, { id: uuidv4(), ...contact }]);
	};

	// deletes contacts from the list
	const handleRemoveContact = (id) => {
		const newContacts = contacts.filter((contact) => {
			return contact.id !== id;
		});
		setContacts(newContacts);
	};

	return (
		<div className='ui container'>
			<BrowserRouter>
			{/* Headers needs to be abouto outside the swtich to remain constant */}
				<Header /> 
				<Switch>
				{/* Route creates 'new pages' List and Add */}
					<Route
						exact
						path='/'
						render={(props) => (
							<List
								{...props}
								contacts={contacts}
								getContactID={handleRemoveContact}
							/>
						)}
					/>
					<Route
						exact
						path='/add'
						render={(props) => <Add {...props} handleAddContact={handleAddContact} />}
					/>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
