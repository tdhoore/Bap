/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import fire from '../components/Firebase/firebase.js';
import {observer} from 'mobx-react';

const Login = ({store}) =>  {
  return (
    <div className=''>
      <form>
        <div className=''>
          <label htmlFor='exampleInputEmail1'>Email address</label>
          <input value={store.email} onChange={e => store.handleChangeLogin(e)} type='email' name='email' className='' id='exampleInputEmail1' aria-describedby='emailHelp' placeholder='Enter email' />
          <p id='emailHelp' className=''>We'll never share your email with anyone else.</p>
        </div>
        <div className=''>
          <label htmlFor='exampleInputPassword1'>Password</label>
          <input value={store.password} onChange={e => store.handleChangeLogin(e)} type='password' name='password' className='' id='exampleInputPassword1' placeholder='Password' />
        </div>
        <button type='submit' onClick={e => store.login(e)} className=''>Login</button>
        <button onClick={e => store.signup(e)} className=''>Signup</button>
      </form>
 
    </div>
  );
};

export default observer(Login);
