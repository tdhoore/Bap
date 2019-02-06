import { observer } from "mobx-react";
import { NavLink } from "react-router-dom";
import React from "react";

const Footer = ({ store }) => {
  return (
    <footer>
      <p>
        <span className="hide">Howest</span>
      </p>
      <ul className="socialLinks">
        <li>
          <a href="#">Facebook</a>
        </li>
        <li>
          <a href="#">Instagram</a>
        </li>
        <li>
          <a href="#">Twitter</a>
        </li>
        <li>
          <a href="#">Email</a>
        </li>
      </ul>
    </footer>
  );
};

export default observer(Footer);
