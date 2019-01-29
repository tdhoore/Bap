import {observer} from 'mobx-react';
import {NavLink} from 'react-router-dom';
import React from 'react';

const Home = ({store}) => {
  if (store.user) {
    return (
      <div>
        {}
        <p>{store.user.email}</p>
      </div>
    );
  } else {
    return (
      <div className=''>
        <ul>
          <li><NavLink to="/login">Inloggen</NavLink></li>
          <li><NavLink to="/register">Registreren</NavLink></li>
        </ul>
        <p>test</p>
      </div>
    );
  }
};
  
export default observer(Home);