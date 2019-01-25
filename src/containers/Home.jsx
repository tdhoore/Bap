import {observer} from 'mobx-react';
import {NavLink} from 'react-router-dom';
import React from 'react';

const Home = ({}) => {
  return (
    <div className=''>
      <ul>
        <li><NavLink to="/login">Inloggen</NavLink></li>
        <li><NavLink to="/register">Registreren</NavLink></li>
      </ul>
    </div>
  );
};
  
export default observer(Home);