/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import * as firebase from 'firebase';
import {observer} from 'mobx-react';

const Login = ({store}) =>  {
  const handleLogin = e => {
    e.preventDefault();
    store.login({
      email: e.target.email.value,
      password: e.target.password.value,
      feedback: store.feedback
    });
  };

  if(store.user){
    return <Redirect to='/'/>
  } else {
  return (
    <div className=''>
      <form onSubmit={e => handleLogin(e)}>
      <p className="auth-feedback">{store.feedback}</p>
        <div className=''>
          <label htmlFor='emailaddress'>Email address</label>
          <input 
            type='email' 
            name='email' 
            id='emailaddress' 
            placeholder='Enter email'/>
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
        <button type='submit'>Login</button>
      </form>
 
    </div>
  );}
};

export default observer(Login);
