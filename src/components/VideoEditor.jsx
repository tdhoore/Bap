// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";
// eslint-disable-next-line no-unused-vars
import Clip from "./Clip.jsx";
// eslint-disable-next-line no-unused-vars
import VideoPlayerEditor from "./VideoPlayerEditor.jsx";
// eslint-disable-next-line no-unused-vars
import Trimmer from "./Trimmer.jsx";

const VideoEditor = ({ store }) => {
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
      clipStart: 0
    });

    //open trimmer window
    store.isTrimmerOpen = true;
  };

  const renderTrimmerWindow = () => {
    if (store.isTrimmerOpen) {
      return <Trimmer store={store} />;
    }
  };

  const renderUploadBarClasses = () => {
    if (store.clips.length > 0) {
      return `uploadBar uploadBarWithClip`;
    } else {
      return `uploadBar`;
    }
  };

  const renderClipsHolderClasses = () => {
    if (store.clips.length > 0) {
      return `clipsHolder clipHolderWithClips`;
    } else {
      return `clipsHolder`;
    }
  };

  return (
    <div>
      {renderTrimmerWindow()}
      <VideoPlayerEditor store={store} videos={store.clips} />
      <div className="timeLine">
        <div className={renderClipsHolderClasses()} ref={clipsHolder}>
          {store.clips.map((clip, index) => {
            return (
              <Clip
                key={`${clip.fileUrl}clip`}
                store={store}
                data={clip}
                index={index}
                totalClips={store.clips.length - 1}
              />
            );
          })}
        </div>
        <div className={renderUploadBarClasses()}>
          <label htmlFor="uploadFile">
            <input
              type="file"
              accept="video/mp4"
              id="uploadFile"
              onChange={e => handleAddClip(e)}
            />
          </label>
        </div>
      </div>
      <button onClick={e => store.uploadClips()}>upload</button>
    </div>
  );
};

export default observer(VideoEditor);
