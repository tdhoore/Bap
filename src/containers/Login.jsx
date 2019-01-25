/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import fire from '../components/Firebase/firebase.js';
import {observer} from 'mobx-react';

const Login = ({store}) =>  {
  const {login} = store;
  const handleLogin = e => {
    e.preventDefault();
    login({
      email: e.target.email.value,
      password: e.target.password.value
    });
  };

  return (
    <div className=''>
      <form onSubmit={e => handleLogin(e)}>
        <div className=''>
          <label htmlFor='exampleInputEmail1'>Email address</label>
          <input type='email' name='email' id='exampleInputEmail1' placeholder='Enter email' />
          <p className=''>We'll never share your email with anyone else.</p>
        </div>
        <div className=''>
          <label htmlFor='exampleInputPassword1'>Password</label>
          <input type='password' name='password' className='' id='exampleInputPassword1' placeholder='Password' />
        </div>
        <button type='submit'>Login</button>
      </form>
 
    </div>
  );
};

export default observer(Login);
