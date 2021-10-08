import React from 'react';
import { Link } from 'react-router-dom';
import user from '../images/userDetails.JPG';

export default function Details(props) {
	// console.log(props)
	const { email, name } = props.location.state.contact;
	return (
		<div className='main'>
			<div className='ui card centered user--details'>
				<div className='image'>
					<img src={user} alt='user' />
				</div>
				<div className='content'>
					<div className='header'>{name}</div>
					<div className='descriptiom'>{email}</div>
				</div>
			</div>
			<div className='center-div'>
				<Link to='/'>
					<button className='ui button green center'>Back to Contacts</button>
				</Link>
			</div>
		</div>
	);
}
