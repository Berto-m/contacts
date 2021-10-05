import React from 'react'

export default function Add() {
  return (
			<div className='ui main'>
				<h3>Add Contact</h3>
				<form className='ui form'>
					<div className='field'>
						<label>Name</label>
						<input type='text' name='name' placeholder='Name' />
					</div>
					<div className='field'>
						<label>Email</label>
						<input type='text' name='Email' placeholder='Email' />
					</div>
          <button className="ui button green">Add</button>
				</form>
			</div>
		);
}
