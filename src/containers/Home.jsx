import {observer} from 'mobx-react';
import {NavLink} from 'react-router-dom';
import React from 'react';

const Home = ({store}) => {
  const handleLogOut = e => {
    e.preventDefault();
    store.logout(e);
  };

  if (store.user) {
    return (
      <div>
        {}
        <ul>
          <li><NavLink to="/" onClick={e => handleLogOut(e)} >Uitloggen</NavLink></li>
        </ul>
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