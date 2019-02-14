import { observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer.jsx";

const PrototypeViewer = ({ store, props }) => {
  const id = props.match.params.id;

  //get data
  store.setCurrentPrototype(id);

  const displayData = name => {
    if (store.currentPrototype) {
      if (store.currentPrototype.doc[name] !== undefined) {
        //exists so render
        return store.currentPrototype.doc[name];
      }
    }
  };

  const handleVerifieer = e => {
    if (store.user.doc.type === 2) {
      const verifyBtn = e.currentTarget;
      verifyBtn.classList.toggle(`verified`);
    }
  };

  const displayPrototypeViewer = () => {
    return (
      <main>
        <article className="prototypeViewer">
          <header>
            <h2>{displayData(`title`)}</h2>
          </header>
          <div className="bigVideoHolder">
            <VideoPlayer
              store={store}
              comments={store.commentsCurrentPrototype}
              prototypeId={id}
              video={displayData("video")}
            />
          </div>
          <div className="makerInfo">
            <div className="textInfo">
              <p>{displayData(`owner`)}</p>
              <p>{displayData(`ownerLocation`)}, 4km</p>
            </div>
            <img
              src={displayData(`ownerProfilePic`)}
              alt="maker profiel foto"
            />
            <button className="verifieerBtn" onClick={e => handleVerifieer(e)}>
              verifieer
            </button>
          </div>
          <p className="prototypeDescription">{displayData(`description`)}</p>
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
