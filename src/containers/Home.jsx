import { observer } from "mobx-react";
import { NavLink } from "react-router-dom";
import React from "react";
import DefaultPageHolder from "../components/DefaultPageHolder.jsx";
import VideoPlayerInfo from "../components/Footer.jsx";

const Home = ({ store }) => {
  // if (store.user) {
  //   return (
  //     <div>
  //       {}
  //       <p>{store.user.email}</p>
  //     </div>
  //   );
  // }

  const displayHome = () => {
    return <main>text</main>;
  };

  return <DefaultPageHolder store={store} main={displayHome()} />;
};

export default observer(Home);
