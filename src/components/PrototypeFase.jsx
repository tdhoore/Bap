// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import PrototypeArticle from "./PrototypeArticle.jsx";

const PrototypeFase = ({ store, faseKey }) => {
  //console.log("prototypes", store.prototypeLevels);
  return (
    <section className="prototypeFase">
      <header>
        <h3>Protoypes fase {faseKey}</h3>
      </header>
      <div className="prototypeArticleHolder">
        {store.prototypeLevels[faseKey].map(prototype => {
          return (
            <PrototypeArticle
              store={store}
              prototype={prototype}
              key={`individualPrototypes${prototype.id}`}
            />
          );
        })}
        <Link
          to={`/createprototype/${store.currentProjectId}/${faseKey}`}
          className="addPrototypeBtn btn"
        >
          prototype toevoegen
        </Link>
      </div>
    </section>
  );
};

export default observer(PrototypeFase);
