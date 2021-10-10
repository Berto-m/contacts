import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import api from './api/contacts';
import { v4 as uuidv4 } from 'uuid';
import Add from './components/Add';
import Header from './components/Header';
import List from './components/List';
import Details from './components/Details';
import Edit from './components/Edit';

function App() {
	const [contacts, setContacts] = useState([]);
	//outside the effect for reusability
	const getContacts = async () => {
		const response = await api.get('/contacts');
		return response.data;
	};

	useEffect(() => {
		// needs to be async because I can't call a func returns promises without being async
		const getAllContacts = async () => {
			const allContacts = await getContacts();
			if (allContacts) {
				setContacts(allContacts);
			}
		};
		getAllContacts();
	}, []);

	const handleAddContact = async (contact) => {
		console.log(contact);
		const resquest = {
			id: uuidv4(),
			...contact,
		};
		// Saves contact info into the JSON server
		const response = await api.post('/contacts', resquest);
		setContacts([...contacts, response.data]);
	};

	const handleUpdateContact = async (contact) => {
		const response = await api.put(`/contacts/${contact.id}`, contact);
		const { id } = response.data;
		setContacts(
			contacts.map((contact) => {
				return contact.id === id ? { ...response.data } : contact;
			})
		);
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
					<Route
						exact
						path='/contact/:id'
						render={(props) => <Details {...props} />}
					/>
					<Route
						exact
						path='/edit'
						render={(props) => (
							<Edit {...props} handleUpdateContact={handleUpdateContact} />
						)}
					/>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
