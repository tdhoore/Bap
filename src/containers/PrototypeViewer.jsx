import { observer } from "mobx-react";
import React from "react";
import DefaultPageHolder from "../components/DefaultPageHolder.jsx";
import { Link } from "react-router-dom";

const PrototypeViewer = ({ store, props }) => {
  const displayPrototypeViewer = () => {
    return (
      <article>
        <header>
          <h2>title</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates
            iure repellendus fuga voluptate? Fugit, fuga eum cupiditate dolorem
            aliquam voluptate. Sed vitae aliquam nobis! At, modi. Id architecto
            adipisci eum.
          </p>
        </header>
        <div className="bigVideoHolder">
          <video src="" />
        </div>
        <div className="makerInfo">name</div>
        <Link to={`/`}>close window</Link>
        <Link to={`/`}>Bekijk instructies</Link>
        <div className="bigCommentHolder" />
      </article>
    );
  };

  return <DefaultPageHolder store={store} main={displayPrototypeViewer()} />;
};

export default observer(PrototypeViewer);
