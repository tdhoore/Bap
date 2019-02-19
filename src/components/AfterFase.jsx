// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

const PrototypeArticle = ({ store, faseKey }) => {
  const getLastActivePrototype = () => {
    let result = "0";

    if (store.prototypeLevels[faseKey - 1] !== undefined) {
      store.prototypeLevels[faseKey - 1].forEach(prototype => {
        if (prototype.isActive) {
          result = prototype.id;
        }
      });
    }

    return result;
  };

  return (
    <section className="prototypeFase afterFase">
      <header>
        <h3>Protoypes fase {faseKey}</h3>
      </header>
      <div className="prototypeArticleHolder">
        <Link
          to={`/createprototype/${
            store.currentProjectId
          }/${faseKey}/${getLastActivePrototype()}`}
          className="addPrototypeBtn btn"
        >
          prototype toevoegen
        </Link>
      </div>
    </section>
  );
};

export default observer(PrototypeArticle);
