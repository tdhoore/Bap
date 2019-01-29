/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {observer} from 'mobx-react';

const RegisterClient = ({store}) =>  {
  const handleRegister = e => {
    e.preventDefault();
    store.register({
      email: e.target.email.value,
      password: e.target.password.value,
      feedback: store.feedback
    });
  };

  return (
    <div className=''>
      <form onSubmit={e => handleRegister(e)}>
      <p className="auth-feedback">{store.feedback}</p>
        <div className=''>
        <label htmlFor='naam'>Naam</label>
          <input 
            type='name' 
            name='name' 
            id='name' 
            placeholder='Voornaam Familienaam'/> 
        </div>
        <div className=''>
          <label htmlFor='emailaddress'>E-mailadres</label>
          <input 
            type='email' 
            name='email' 
            id='emailaddress' 
            placeholder='billie@mail.com'/>
          <p className=''>We delen jouw e-mailadres nooit met iemand anders.</p>
        </div>
        <div className=''>
          <label htmlFor='passwordinput'>Wachtwoord</label>
          <input 
            type='password' 
            name='password' 
            className=''
            id='passwordinput' 
            placeholder='Wachtwoord' />
        </div>
        <button type='submit'>Registreer</button>
      </form>
    </div>
  );
};

export default observer(RegisterClient);
