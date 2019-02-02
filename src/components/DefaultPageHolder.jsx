import { observer } from "mobx-react";
import { NavLink } from "react-router-dom";
import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const DefaultPageHolder = ({ store, main }) => {
  return (
    <div>
      <Header store={store} activeLink="/" />
      {main}
      <Footer store={store} />
    </div>
  );
};

export default observer(DefaultPageHolder);
