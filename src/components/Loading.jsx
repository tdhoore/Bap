import { observer } from "mobx-react";
import React from "react";
import { Redirect } from "react-router-dom";

const Loading = ({ store, link }) => {
  if (store.loading) {
    return (
      <div className="loading-wrapper">
        <h3>{store.message}</h3>
        <img src="assets/img/peter.svg" alt="peter" />
        <p>
          Wist je dat.. <br /> D4E1 al sinds 2009 geweldige projecten
          produceert?
        </p>
      </div>
    );
  } else if (store.loadingReady) {
    return <Redirect to={link} />;
  }
  return <div />;
};

export default observer(Loading);
