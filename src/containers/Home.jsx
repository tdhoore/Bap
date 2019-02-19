/* eslint-disable no-unused-vars */
import { observer } from "mobx-react";
import React from "react";
import DefaultPageHolder from "../components/DefaultPageHolder.jsx";
import VideoPlayerInfo from "../components/VideoPlayerInfo.jsx";
import CardHolder from "../components/CardHolder.jsx";
import Sorter from "../components/Sorter.jsx";
import Filter from "../components/Filter.jsx";
import lifecycle from "react-pure-lifecycle";

const componentDidMount = props => {
  props.store.updateLoading();
};

const methods = {
  componentDidMount
};

const options = {
  usePureComponent: false
};

const Home = ({ store }) => {
  const displayHome = () => {
    return (
      <main>
        {displayInfoVideo()}
        <section className="highLightedSection">
          <header className="mainHeader">
            <h2>Projecten in je buurt</h2>
          </header>
          <CardHolder
            store={store}
            content={store.allProjects}
            counter={store.buurtCounter}
            counterName={`buurtCounter`}
          />
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
    if (!store.user) {
      return <VideoPlayerInfo store={store} />;
    }
  };

  return <DefaultPageHolder store={store} main={displayHome()} />;
};

export default lifecycle(methods, options)(observer(Home));
