// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";
// eslint-disable-next-line no-unused-vars
import Clip from "../components/Clip.jsx";

const Track = ({ store, trackId, editorType }) => {
  const clipsHolder = React.createRef();

  const handleAddClip = e => {
    //get file
    const file = e.currentTarget.files[0];
    const fileURL = URL.createObjectURL(file);

    //is image or video
    const type = file.type;
    let isVideo = false;

    if (type.includes("video")) {
      //is video
      isVideo = true;
    }

    //add clip to the timeline
    //and set as active clip
    store.addClipToTimeLine({
      id: store.clipId,
      fileUrl: fileURL,
      file: file,
      isVideo: isVideo,
      isActiveClip: false,
      duration: 0,
      maxDuration: 0,
      clipLength: 100,
      clipStart: 0,
      trackId: trackId
    });

    //open trimmer window
    store.isTrimmerOpen = true;
  };

  const checkIfClipPresentInThisTrack = () => {
    let result = false;

    store.clips.forEach(clip => {
      if (clip.trackId === trackId) {
        result = true;
      }
    });

    return result;
  };

  const renderUploadBarClasses = () => {
    if (store.clips.length > 0 && checkIfClipPresentInThisTrack()) {
      return `uploadBar uploadBarWithClip`;
    } else {
      return `uploadBar`;
    }
  };

  const renderClipsHolderClasses = () => {
    if (store.clips.length > 0 && checkIfClipPresentInThisTrack()) {
      return `clipsHolder clipHolderWithClips`;
    } else {
      return `clipsHolder`;
    }
  };

  return (
    <div className={`track track${trackId}`}>
      <div className={renderClipsHolderClasses()} ref={clipsHolder}>
        {store.clips.map((clip, index) => {
          if (clip.trackId === trackId) {
            return (
              <Clip
                key={`${clip.fileUrl}clip`}
                store={store}
                data={clip}
                index={index}
                totalClips={store.clips.length - 1}
                editorType={editorType}
              />
            );
          }
        })}
      </div>
      <div className={renderUploadBarClasses()}>
        <label htmlFor="uploadFile" className="uploadLabel">
          <span>Selecteer je video’s</span>
          <input
            type="file"
            accept="video/mp4"
            id="uploadFile"
            onChange={e => handleAddClip(e)}
          />
        </label>
      </div>
    </div>
  );
};

export default observer(Track);
