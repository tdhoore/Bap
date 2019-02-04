/* eslint-disable no-unused-vars */
import React from 'react';
import {observer} from 'mobx-react';
import {Link} from 'react-router-dom';

const UserTypeSelector = ({store}) =>  {
  const handleUserType = e => {
    store.formObject.type = parseInt(e.currentTarget.value);
    console.log('type:', store.formObject.type);
  }

  const handleNextPage = e => {
    store.step++;
    console.log(store.step);
  }

  return (
   <div className=''>
     <h3>Registreer</h3>
      <p>Wat voor gebruiker ben je?</p>

      <label htmlFor="klant">
      <span>Klant</span>
      <input 
      type="radio"
      id="klant"
      value="0"
      name="usertype"
      onChange={e => handleUserType(e)}
      />
      <span className="selectedType"></span>
      </label>

      <label htmlFor="maker">
      <span>maker</span>
      <input 
      type="radio"
      id="maker"
      value="1"
      name="usertype"
      onChange={e => handleUserType(e)}
      />
      <span className="selectedType"></span>
      </label>

      <label htmlFor="ergo">
      <span>ergo</span>
      <input 
      type="radio"
      id="ergo"
      value="2"
      name="usertype"
      onChange={e => handleUserType(e)}
      />
      <span className="selectedType"></span>
      </label>
      <button onClick={e => handleNextPage(e)}>Volgende</button>
    </div>
  );
};

export default observer(UserTypeSelector);