// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

const PrototypeArticle = ({ store, faseKey }) => {
  return (
    <section className="prototypeFase afterFase">
      <header>
        <h3>Protoypes fase {faseKey}</h3>
      </header>
      <div className="prototypeArticleHolder">
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

export default observer(PrototypeArticle);
