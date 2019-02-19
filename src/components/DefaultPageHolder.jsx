import { observer } from "mobx-react";
import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const DefaultPageHolder = ({ store, main, activeLink = "/" }) => {
  return (
    <div className="wrapper">
      <div className="headerAndMainHolder">
        <Header store={store} activeLink={activeLink} />
        {main}
      </div>
      <Footer store={store} />
    </div>
  );
};

export default observer(DefaultPageHolder);
