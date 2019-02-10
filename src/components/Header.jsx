import { observer } from "mobx-react";
import { NavLink } from "react-router-dom";
import React from "react";

const Header = ({ store, activeLink }) => {
  const defaultNav = [
    { name: "ontdek", link: "/" },
    { name: "login", link: "/login" }
  ];
  const logedInNav = [
    { name: "ontdek", link: "/" },
    { name: "mijn projecten", link: "/mijnprojecten" },
    { name: "upload", link: "/upload" }
  ];

  const createNav = array => {
    return array.map(item => {
      if (item.link === activeLink) {
        //is active link
        return (
          <li key={`linkId${item.link}${item.name}`} className="activeLink">
            <NavLink to={item.link}>{item.name}</NavLink>
          </li>
        );
      } else {
        //is not active link
        return (
          <li key={`linkId${item.link}${item.name}`}>
            <NavLink to={item.link}>{item.name}</NavLink>
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
      <h1>
        <span>D4E1</span>
      </h1>
      <nav>
        <ul>{displayCorrectNav()}</ul>
      </nav>
    </header>
  );
};

export default observer(Header);
