import { observer } from "mobx-react";
import { NavLink } from "react-router-dom";
import React from "react";
import DefaultPageHolder from "../components/DefaultPageHolder.jsx";
import VideoPlayerInfo from "../components/Footer.jsx";

const Home = ({ store }) => {
  const displayInfoVideo = () => {
    if (!store.user) {
      return <VideoPlayerInfo store={store} />;
    }
  };

  const displayHome = () => {
    return (
      <main>
        {displayInfoVideo()}
        <section>
          <header>
            <h2>Projecten in je buurt</h2>
          </header>
          <div className="projectHolder">divs</div>
        </section>
        <section>
          <header className="hide">
            <h2>Gesorteerd op tag</h2>
          </header>
          <ul className="projectTags">
            <li>
              <button>text</button>
            </li>
            <li>
              <button>text</button>
            </li>
            <div className="projectHolder">divs</div>
          </ul>
        </section>
        <section>
          <header>
            <h2>Nieuwe projecten</h2>
          </header>
          <div className="projectHolder">divs</div>
        </section>
      </main>
    );
  };

  return <DefaultPageHolder store={store} main={displayHome()} />;
};

export default observer(Home);
