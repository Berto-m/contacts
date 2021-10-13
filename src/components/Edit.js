import React, { useState } from 'react';

export default function Edit(props) {
  const { id, name, email } = props.location.state.contact;
  console.log(props);
  // initialise states with the data that got passed through props.
  const [info, setInfo] = useState({ id, name, email });

  // tracks contacts name and email and syncs it with state
  const handleChangeName = (event) => {
    console.log(event.target.value);
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
    });
  };

  // prevents page from page from reshesing after every submit
  const onSubmitUpdate = (event) => {
    event.preventDefault();

    // sends data to its parent (app.js) for rendering.
    props.handleUpdateContact(info);

    // clear input fields after submit update
    setInfo({ name: '', email: '' });

    // redirects user to the list page where all the contacts are
    props.history.push('/');
  };

  return (
    <div className='ui main'>
      <h3>Update Contact</h3>
      <form className='ui form' onSubmit={onSubmitUpdate}>
        <div className='field'>
          <label>Name</label>
          <input
            type='text'
            name='name'
            placeholder='Name'
            required
            value={info.name}
            onChange={handleChangeName}
          />
        </div>
        <div className='field'>
          <label>Email</label>
          <input
            type='text'
            name='email'
            required
            placeholder='Email'
            value={info.email}
            onChange={handleChangeName}
          />
        </div>
        <button className='ui button green'>Update</button>
      </form>
    </div>
  );
}
