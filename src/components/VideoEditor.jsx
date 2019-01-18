// eslint-disable-next-line no-unused-vars
import React from 'react';
import {observer} from 'mobx-react';
// eslint-disable-next-line no-unused-vars
import Clip from './Clip.jsx';
import video from '../assets/video/vid.mp4';
import img from '../assets/img/pic.jpg';

const VideoEditor = ({store}) => {
  const clipsHolder = React.createRef();

  const handleAddClip = e => {
    //get file
    const file = e.currentTarget.files[0];
    const fileURL = URL.createObjectURL(file);

    //is image or video
    const type = file.type;
    let isVideo = false;

    if (type.includes('video')) {
      //is video
      isVideo = true;
    }

    //add clip to the timeline
    //and set as active clip
    store.addClipToTimeLine({
      fileUrl: fileURL,
      isVideo: isVideo,
      isActiveClip: true,
      duration: `0:30`
    });
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
      <video className='test' src={store.activeClipUrl} />
      <div className='timeLine'>
        <div className='deel1' />
        <div className={renderClipsHolderClasses()} ref={clipsHolder}>
          {store.clips.map(clip => {
            return (
              <Clip key={`${clip.fileUrl}clip`} store={store} data={clip} />
            );
          })}
        </div>
        <div className={renderUploadBarClasses()}>
          <label htmlFor='uploadFile'>
            <input
              type='file'
              accept='video/mp4'
              id='uploadFile'
              onChange={e => handleAddClip(e)}
            />
          </label>
        </div>
        <div className='deel2' />
      </div>
    </div>
  );
};

export default observer(VideoEditor);
