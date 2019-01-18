/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import fire from '../config/Fire.js';
import {observer} from 'mobx-react';

const Login = ({store}) =>  {
  return (
    <div className='col-md-6'>
      <form>
        <div className='form-group'>
          <label htmlFor='exampleInputEmail1'>Email address</label>
          <input value={store.email} onChange={store.handleChangeLogin} type='email' name='email' className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' placeholder='Enter email' />
          <p id='emailHelp' className='form-text text-muted'>We'll never share your email with anyone else.</p>
        </div>
        <div className='form-group'>
          <label htmlFor='exampleInputPassword1'>Password</label>
          <input value={store.password} onChange={store.handleChangeLogin} type='password' name='password' className='form-control' id='exampleInputPassword1' placeholder='Password' />
        </div>
        <button type='submit' onClick={store.login} className='btn btn-primary'>Login</button>
        <button onClick={store.signup} className='btn btn-success'>Signup</button>
      </form>
 
    </div>
  );
};

export default observer(Login);
