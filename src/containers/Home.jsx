import { observer } from "mobx-react";
import React from "react";
import DefaultPageHolder from "../components/DefaultPageHolder.jsx";
import VideoPlayerInfo from "../components/VideoPlayerInfo.jsx";
import CardHolder from "../components/CardHolder.jsx";
import { Link } from "react-router-dom";
        
const Home = ({ store }) => {
   const handleLogOut = e => {
    e.preventDefault();
    store.logout(e);
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
          <li><NavLink to="/" onClick={e => handleLogOut(e)} >Uitloggen</NavLink></li>
        </ul>
        <p>{store.user.email}</p>
      </div>
    );
  } else {
    return (
      <div className=''>
        <ul>
          <li><NavLink to="/login">Inloggen</NavLink></li>
          <li><NavLink to="/register">Registreren</NavLink></li>
        </ul>
      </div>

  const displayHome = () => {
    return (
      <main>
        <Link to="/projectdetail/firstproject">uberlink</Link>
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
