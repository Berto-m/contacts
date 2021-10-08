import React from 'react'
import user from '../images/user.png'

export default function Card(props) {

  // creates contact layout 
  const {id, name, email} = props.contact
  return (
			<div className='item'>
      <img src={user} alt="user" className="ui avatar image" />
				<div className='content'>
					<div className='header'>{name}</div>
					<div>{email}</div>
				</div>
				<i className='trash alternate outline icon'
        style={{color:'red', marginTop: '7px'}}
				onClick={() => props.handleClick(id)} ></i>
			</div>
		);
}
