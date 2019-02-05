/* eslint-disable no-unused-vars */
import { observer } from "mobx-react";
import { NavLink } from "react-router-dom";
import React from "react";
import DefaultPageHolder from "../components/DefaultPageHolder.jsx";
import VideoPlayerInfo from "../components/VideoPlayerInfo.jsx";
import CardHolder from "../components/CardHolder.jsx";
import Sorter from "../components/Sorter.jsx";
import Filter from "../components/Filter.jsx";
import { Link } from "react-router-dom";

const Home = ({ store }) => {
  const displayHome = () => {
    return (
      <main>
        {displayInfoVideo()}
        <section>
          <header>
            <h2>Projecten in je buurt</h2>
          </header>
          <div className="projectHolder">
            <CardHolder store={store} content={store.allProjects} />
          </div>
        </section>
        <section>
          <div className="filterAndHeader">
            <header>
              <h2>Ontdek</h2>
            </header>
            <Filter store={store} />
          </div>
          <Sorter store={store} />
          <CardHolder store={store} content={store.allProjects} />
        </section>
      </main>
    );
  };

  const displayInfoVideo = () => {
    console.log(store.user);
    if (!store.user) {
      return <VideoPlayerInfo store={store} />;
    }
  };

  if (store.user) {
    return (
      <div>
        {}
        <ul>
          <li>
            <NavLink to="/" onClick={e => store.handleLogOut(e)}>
              Uitloggen
            </NavLink>
          </li>
        </ul>
        <DefaultPageHolder store={store} main={displayHome()} />
      </div>
    );
  } else {
    return (
      <div className="">
        <ul>
          <li>
            <NavLink to="/login">Inloggen</NavLink>
          </li>
          <li>
            <NavLink to="/register">Registreren</NavLink>
          </li>
        </ul>
        <DefaultPageHolder store={store} main={displayHome()} />
      </div>
    );
  }
};

export default observer(Home);
