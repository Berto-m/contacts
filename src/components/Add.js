import React, { useState } from 'react'


export default function Add(props) {
	// state to manage users' name and email
	const [info, setInfo] = useState({ name: '', email: '' });

	// tracks user's name and syncs it with state
	const handleChangeName = (event) => {
    console.log(event.target.value);
		setInfo({
			...info,
			[event.target.name]: event.target.value,
		});
	};



  // prevents page from page from reshesing after every submit
	const onSubmitForm = (event) => {
		event.preventDefault();

		// sends data to its parent (app.js) for rendering.
		props.handleAddContact(info);

		// clear input fields 
		setInfo({name: '', email: ''});
	};


	

	return (
		<div className='ui main'>
			<h3>Add Contact</h3>
			<form className='ui form' onSubmit={onSubmitForm}>
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
				<button className='ui button green'>Add</button>
			</form>
		</div>
	);
}
