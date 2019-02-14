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
import DefaultPageHolder from "../components/DefaultPageHolder.jsx";
import Loading from "../components/Loading.jsx";

const VideoEditor = ({ store, editorType, props }) => {
  const renderTrimmerWindow = () => {
    if (store.isTrimmerOpen) {
      return <Trimmer store={store} />;
    }
  };

  const handleUpload = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    //add editor type to editorType
    data.editorType = editorType;

    //save data to store
    store.formContent = data;

    console.log(store.formContent);

    //upload clips
    store.uploadClips();
  };

  const handleInputTitle = e => {
    const input = e.currentTarget;

    //set the store message
    const username = store.user.doc.name;
    store.message = `${username.split(" ")[0]} wil ${input.value}`;
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
              <input
                type="text"
                id="title"
                name="title"
                required
                onInput={e => handleInputTitle(e)}
              />
            </label>
            <label htmlFor="description">
              <span>Jouw verhaal</span>
              <textarea name="description" id="description" required />
            </label>
            <button className="btn">upload</button>
          </div>
        </div>
      );
    } else if (editorType === 1) {
      //console.log("props", props.match.params);
      const fase = props.match.params.fase;
      const projectId = props.match.params.projectId;

      //upload voor de maker
      return (
        <div className="createProjectForm">
          <div className="titleAndStoryHolder">
            <input type="hidden" name="fase" value={fase} />
            <input type="hidden" name="projectId" value={projectId} />
            <label htmlFor="title">
              <span>Titel</span>
              <input
                type="text"
                id="title"
                name="title"
                required
                onInput={e => handleInputTitle(e)}
              />
            </label>
            <label htmlFor="description">
              <span>Extra uitleg</span>
              <textarea
                name="description"
                id="description"
                required
                className="prototypetextarea"
              />
            </label>
            <div className="difficultySelector">
              <p>Moeilijkheidsgraad product</p>
              <label htmlFor="beginner">
                <span>Beginner</span>
                <input
                  type="radio"
                  name="difficulty"
                  id="beginner"
                  required
                  value="0"
                />
                <span className="selectedBox" />
              </label>
              <label htmlFor="hobbyist">
                <span>Hobbyist</span>
                <input
                  type="radio"
                  name="difficulty"
                  id="hobbyist"
                  required
                  value="1"
                />
                <span className="selectedBox" />
              </label>
              <label htmlFor="expert">
                <span>Expert</span>
                <input
                  type="radio"
                  name="difficulty"
                  id="expert"
                  required
                  value="2"
                />
                <span className="selectedBox" />
              </label>
            </div>
            <button className="btn">upload</button>
          </div>
        </div>
      );
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
      return <Track store={store} trackId={2} editorType={editorType} />;
    }
  };

  const displayEditor = () => {
    return (
      <article className="videoEditor">
        <header>
          <h2>Nieuw project</h2>
        </header>
        <Loading store={store} link={`/projectdetail/${store.newProjectId}`} />
        {console.log(`CURRENT PROJECT`, store.newProjectId)}
        {renderTrimmerWindow()}
        <div className="videoEditorHolder colorBg colorBgTop">
          <VideoPlayerEditor
            store={store}
            videos={store.clips}
            editorType={editorType}
          />
          <form onSubmit={e => handleUpload(e)}>{displayCorrectForm()}</form>
          <div className="timeLine">
            <Track store={store} trackId={1} infoText="help mij" />
            {displayExtraTrack()}
          </div>
        </div>
      </article>
    );
  };

  return (
    <DefaultPageHolder
      activeLink="/upload"
      store={store}
      main={displayEditor()}
    />
  );
};

export default observer(VideoEditor);
