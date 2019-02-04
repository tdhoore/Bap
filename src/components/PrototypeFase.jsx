// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";
import PrototypeArticle from "./PrototypeArticle.jsx";

const PrototypeFase = ({ store, faseKey }) => {
  console.log(faseKey);

  return (
    <section>
      <header>
        <h3>Protoypes fase {faseKey}</h3>
      </header>
      {store.prototypeLevels[faseKey].map(prototype => {
        console.log("prototype", prototype);
        return (
          <PrototypeArticle
            store={store}
            prototype={prototype}
            key={`individualPrototypes${prototype.id}`}
          />
        );
      })}
    </section>
  );
};

export default observer(PrototypeFase);
