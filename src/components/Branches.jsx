// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";
import PrototypeFase from "./PrototypeFase.jsx";

const Branches = ({ store }) => {
  //get branches
  store.getProjectBranches();

  const createMovie = e => {
    store.createAfterMovie();
  };

  const mapProtoTypes = () => {
    if (store.prototypeLevels !== {}) {
      return Object.keys(store.prototypeLevels).map(key => {
        return (
          <PrototypeFase
            store={store}
            faseKey={key}
            key={`prototypefase${key}`}
          />
        );
      });
    }
  };

  return (
    <section>
      <header>
        <h2>Protoypes</h2>
      </header>
      {mapProtoTypes()}
    </section>
  );
};

export default observer(Branches);
