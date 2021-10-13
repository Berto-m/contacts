import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import api from './api/contacts';
import './App.css';
import Add from './components/Add';
import Details from './components/Details';
import Edit from './components/Edit';
import Header from './components/Header';
import List from './components/List';

function App() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);

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
    // Saves contact information into the JSON server
    const response = await api.post('/contacts', resquest);
    setContacts([...contacts, response.data]);
  };

  //
  const handleUpdateContact = async (contact) => {
    // the contact is the body of the put request.
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  // deletes contacts from the json server
  const handleRemoveContact = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContacts = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContacts);
  };

  const handleSearch = (searchValue) => {
    setSearch(searchValue);
    if (search !== '') {
      // object values returns an array of the contacts values
      //inclues checks if the string searchValue value in the array
      const filteredContacts = contacts.filter((contact) => {
        return Object.values(contact)
          .join(' ')
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setSearchResult(filteredContacts);
    } else {
      setSearchResult(contacts);
    }
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
                // if search is empty it means that I am not typing anything
                // then pass
                contacts={search.length < 1 ? contacts : searchResult}
                getContactID={handleRemoveContact}
                search={search}
                handleSearch={handleSearch}
              />
            )}
          />
          <Route
            exact
            path='/add'
            render={(props) => (
              <Add {...props} handleAddContact={handleAddContact} />
            )}
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
