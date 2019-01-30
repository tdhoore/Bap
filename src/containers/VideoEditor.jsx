// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";
// eslint-disable-next-line no-unused-vars
import VideoPlayerEditor from "../components/VideoPlayerEditor.jsx";
import BodySelector from "../components/BodySelector.jsx";
// eslint-disable-next-line no-unused-vars
import Trimmer from "../components/Trimmer.jsx";
// eslint-disable-next-line no-unused-vars
import Track from "../components/Track.jsx";
// eslint-disable-next-line no-unused-vars
import Outro from "../components/Outro.jsx";

const VideoEditor = ({ store, editorType }) => {
  const renderTrimmerWindow = () => {
    if (store.isTrimmerOpen) {
      return <Trimmer store={store} />;
    }
  };

  const handleUpload = e => {
    e.preventDefault();
    console.log(e);
    const formData = new FormData(e.target);
    const data = {};

    formData.forEach(function(value, key) {
      data[key] = value;
    });

    console.log(data);

    //store.uploadClips();
  };

  const displayCorrectForm = () => {
    if (editorType === 0) {
      //upload a project voor de klant
      return (
        <div className="createProjectForm">
          <BodySelector store={store} />
          <div className="titleAndStoryHolder">
            <label htmlFor="title">
              <span>Wat is je doel?</span>
              <input type="text" id="title" name="title" required />
            </label>
            <label htmlFor="verhaal">
              <span>Jouw verhaal</span>
              <textarea name="verhaal" id="verhaal" required />
            </label>
          </div>
        </div>
      );
    } else if (editorType === 1) {
      //upload voor de maker
    } else if (editorType === 2) {
      //upload voor de eind video
    }
  };

  const displayExtraTrack = () => {
    if (editorType === 0) {
      //add to total time

      //de gebruiker krijgt een extra css track
      return <Outro store={store} />;
    } else if (editorType === 1) {
      //de maker heeft 2 gewone tracks
      return <Track store={store} trackId={2} />;
    }
  };

  return (
    <div>
      {renderTrimmerWindow()}
      <div className="videoAndFormHolder">
        <VideoPlayerEditor
          store={store}
          videos={store.clips}
          editorType={editorType}
        />
        <form onSubmit={e => handleUpload(e)}>
          {displayCorrectForm()}
          <button>upload</button>
        </form>
      </div>
      <div className="timeLine">
        <Track store={store} trackId={1} />
        {displayExtraTrack()}
      </div>
    </div>
  );
};

export default observer(VideoEditor);
