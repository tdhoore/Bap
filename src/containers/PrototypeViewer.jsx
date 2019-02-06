import { observer } from "mobx-react";
import React from "react";
import DefaultPageHolder from "../components/DefaultPageHolder.jsx";
import { Link } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer.jsx";

const PrototypeViewer = ({ store, props }) => {
  //const id = props.match.params.id;
  const id = `rqIcxMhToSIr2tK8cPM7`;

  const displayPrototypeViewer = () => {
    return (
      <main>
        <article className="prototypeViewer">
          <header>
            <h2>title</h2>
          </header>
          <div className="bigVideoHolder">
            <VideoPlayer
              store={store}
              comments={store.commentsCurrentPrototype}
              prototypeId={id}
            />
          </div>
          <div className="makerInfo">
            <div className="textInfo">
              <p>name</p>
              <p>location, 4km</p>
            </div>
            <img src="" alt="" />
            <button className="verifieerBtn">verifieer</button>
          </div>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates
            iure repellendus fuga voluptate? Fugit, fuga eum cupiditate dolorem
            aliquam voluptate. Sed vitae aliquam nobis! At, modi. Id architecto
            adipisci eum.
          </p>
          <Link
            to={`/projectdetail/${store.currentProjectId}`}
            className="closeBtn"
          >
            close window
          </Link>
          <Link to={`/`} className="btn instructieBtn">
            Bekijk instructies
          </Link>
          <div className="bigCommentHolder" />
        </article>
      </main>
    );
  };

  return displayPrototypeViewer();
};

export default observer(PrototypeViewer);
