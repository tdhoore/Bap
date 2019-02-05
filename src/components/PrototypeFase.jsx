// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import PrototypeArticle from "./PrototypeArticle.jsx";

const PrototypeFase = ({ store, faseKey }) => {
  return (
    <section>
      <header>
        <h3>Protoypes fase {faseKey}</h3>
      </header>
      {store.prototypeLevels[faseKey].map(prototype => {
        return (
          <PrototypeArticle
            store={store}
            prototype={prototype}
            faseKey={faseKey}
            key={`individualPrototypes${prototype.id}`}
          />
        );
      })}
      <Link to="/">prototype toevoegen</Link>
    </section>
  );
};

export default observer(PrototypeFase);
