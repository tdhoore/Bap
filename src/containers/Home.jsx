/* eslint-disable no-unused-vars */
import { observer } from "mobx-react";
import React from "react";
import DefaultPageHolder from "../components/DefaultPageHolder.jsx";
import VideoPlayerInfo from "../components/VideoPlayerInfo.jsx";
import CardHolder from "../components/CardHolder.jsx";
import Sorter from "../components/Sorter.jsx";
import Filter from "../components/Filter.jsx";

const Home = ({ store }) => {
  const displayHome = () => {
    return (
      <main>
        {displayInfoVideo()}
        <section className="highLightedSection">
          <header className="mainHeader">
            <h2>Projecten in je buurt</h2>
          </header>
          <CardHolder store={store} content={store.allProjects} />
        </section>
        <section className="lastSection">
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

  return <DefaultPageHolder store={store} main={displayHome()} />;
};

export default observer(Home);
