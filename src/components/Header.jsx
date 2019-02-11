import { observer } from 'mobx-react';
import { NavLink, Link } from 'react-router-dom';
import React from 'react';

const Header = ({ store, activeLink }) => {
  const defaultNav = [
    { name: 'ontdek', link: '/' , klasse: 'ontdek_icon', klasseActief: 'ontdek_icon_active'},
    { name: 'login', link: '/login', klasse: 'login_icon', klasseActief: 'login_icon_active'}
  ];
  const logedInNav = [
    { name: 'ontdek', link: '/', klasse: 'ontdek_icon', klasseActief: 'ontdek_icon_active'},
    { name: 'mijn projecten', link: '/mijnprojecten', klasse: 'projecten_icon', klasseActief: 'projecten_icon_active'},
    { name: 'upload', link: '/upload', klasse: 'upload_icon', klasseActief: 'upload_icon_active'}
  ];

  const displayLogout = () => {
    if(store.user){
      return <li><NavLink to='/' onClick={e => store.logout()}>Uitloggen</NavLink></li>
    }
  };

  const createNav = array => {
    return array.map(item => {
      if (item.link === activeLink) {
        //is active link
        return (
          <li key={`linkId${item.link}${item.name}`} className={`activeLink`}>
            <NavLink to={item.link} className={item.klasseActief}>{item.name}</NavLink>
          </li>
        );
      } else {
        //is not active link
        return (
          <li key={`linkId${item.link}${item.name}`}>
            <NavLink to={item.link} className={item.klasse}>{item.name}</NavLink>
          </li>
        );
      }
    });
  };

  const displayCorrectNav = () => {
    if (store.user) {
      //display logedin nav
      return createNav(logedInNav);
    } else {
      //display default login
      return createNav(defaultNav);
    }
  };

  return (
    <header className="topHeader">
      <Link to='/'>
        <h1 className='logo'>
          <span>D4E1</span>
        </h1>
      </Link>
      <nav>
        <ul>{displayCorrectNav()}{displayLogout()}</ul>
      </nav>
    </header>
  );
};

export default observer(Header);
