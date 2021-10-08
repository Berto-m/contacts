import React from 'react'
import Card from './Card';


export default function List(props) {

  const handleDeleteContact = (id) => {
    props.getContactID(id);
  }

  console.log(props);
  // accepts props (data from app.js and render its content with map)
  const renderedContacts = props.contacts.map(contact => {
    return (
      <Card contact={contact} handleClick={handleDeleteContact} key={contact.id} />
    )
  }) 

  return (
    <div className="ui celled list">{renderedContacts}</div>
  )
}
