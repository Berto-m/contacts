import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';

export default function List(props) {
  const handleDeleteContact = (id) => {
    props.getContactID(id);
  };

  // accepts sends props to Card.js (data from app.js and render its content with map)
  const renderedContacts = props.contacts.map((contact) => {
    return (
      <Card
        contact={contact}
        handleClick={handleDeleteContact}
        key={contact.id}
      />
    );
  });

  const onChangeSearch = (event) => {
    props.handleSearch(event.target.value);
  };

  return (
    <div className='main'>
      <div className='flex'>
        <h3>Contact List</h3>
        {/* Takes users to the add page when the button is clicked */}
        <Link to='/add'>
          <button className='ui button green'>Add Contact</button>
        </Link>
      </div>
      <div className='ui search'>
        <div className='ui icon input'>
          <input
            className='prompt'
            type='text'
            placeholder='Search'
            value={props.search}
            onChange={onChangeSearch}
          />
          <i className='search icon'></i>
        </div>
      </div>
      <div className='ui celled list'>{renderedContacts}</div>
    </div>
  );
}
