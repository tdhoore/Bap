import { observer } from "mobx-react";
import React from "react";
import DefaultPageHolder from "../components/DefaultPageHolder.jsx";
import { Link } from "react-router-dom";

const PrototypeViewer = ({ store, props }) => {
  const displayPrototypeViewer = () => {
    return (
      <div>
        <section>
          <header>
            <h2>Updates</h2>
          </header>
        </section>
        <section>
          <header>
            <h2>Mijn projecten</h2>
          </header>
        </section>
      </div>
    );
  };

  return <DefaultPageHolder store={store} main={displayPrototypeViewer()} />;
};

export default observer(PrototypeViewer);
