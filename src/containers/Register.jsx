/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {observer} from 'mobx-react';

const Register = ({store}) =>  {
  const handleRegister = e => {
    e.preventDefault();
    store.register({
      email: e.target.email.value,
      password: e.target.password.value,
      feedback: store.feedback
    });
  };

  if(store.user){
    return <Redirect to='/'/>
  } else {
  console.log(`feedback:`, store.feedback);
  return (
    <div className=''>
      <form onSubmit={e => handleRegister(e)}>
      <p className="auth-feedback">{store.feedback}</p>
        <div className=''>
          <label htmlFor='emailaddress'>Email address</label>
          <input 
            type='email' 
            name='email' 
            id='emailaddress' 
            placeholder='Enter email'/>
          <p className=''>We'll never share your email with anyone else.</p>
        </div>
        <div className=''>
          <label htmlFor='passwordinput'>Password</label>
          <input 
            type='password' 
            name='password' 
            className=''
            id='passwordinput' 
            placeholder='Password' />
        </div>
        <button type='submit'>Register</button>
      </form>
    </div>
  );
  }
};

export default observer(Register);
