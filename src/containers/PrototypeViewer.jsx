import { observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer.jsx";
import lifecycle from "react-pure-lifecycle";

const componentDidMount = props => {
  const id = props.props.match.params.id;

  //remove editor files
  props.store.getPrototypeComments(id);
};

const methods = {
  componentDidMount
};

const options = {
  usePureComponent: false
};

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
            <button className="verifieerBtn">verifieer</button>
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

export default lifecycle(methods, options)(observer(PrototypeViewer));
