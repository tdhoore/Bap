// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";
import PrototypeFase from "./PrototypeFase.jsx";
import AfterFase from "./AfterFase.jsx";
import lifecycle from "react-pure-lifecycle";

const componentDidMount = props => {
  //get branches
  props.store.getProjectBranches(1, "0", true);
};

const methods = {
  componentDidMount
};

const options = {
  usePureComponent: false
};

const Branches = ({ store }) => {
  const createMovie = e => {
    store.createAfterMovie();
  };

  const afterMovieLink = () => {};

  const mapProtoTypes = () => {
    if (
      store.prototypeLevels !== {} &&
      store.prototypeLevels[1] !== undefined
    ) {
      console.log("prototypes", store.prototypeLevels);
      return Object.keys(store.prototypeLevels).map(key => {
        //check if prototype is approved by 2 people owner en ergo
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

  const afterFase = () => {
    const key = Object.keys(store.prototypeLevels).length + 1;
    if (store.user) {
      return <AfterFase store={store} faseKey={key} />;
    }
  };

  return (
    <section className="protoTypes">
      <header>
        <h2 className="hide">Protoypes</h2>
      </header>
      {mapProtoTypes()}
      {afterFase()}
    </section>
  );
};

export default lifecycle(methods, options)(observer(Branches));
