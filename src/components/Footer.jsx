import { observer } from "mobx-react";
import { NavLink } from "react-router-dom";
import React from "react";

const Footer = ({ store }) => {
  return (
    <footer>
      <p>
        <a href="https://www.howest.be/nl" target='_blank' className="hide">Howest</a>
      </p>
      <ul className="socialLinks">
        <li>
          <a href="https://www.facebook.com/Designforeveryone-896675550720332/" target='_blank' className='facebook'>Facebook</a>
        </li>
        <li>
          <a href="https://www.instagram.com/howestipo/" target='_blank' className='insta'>Instagram</a>
        </li>
        <li>
          <a href="https://twitter.com/HowestIPO" target='_blank' className='twitter'>Twitter</a>
        </li>
        <li>
          <a href="mailto:lieven.de.couvreur@howest.be" target='_blank' className='sm_mail'>Email</a>
        </li>
      </ul>
    </footer>
  );
};

export default observer(Footer);
