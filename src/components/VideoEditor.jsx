// eslint-disable-next-line no-unused-vars
import React from 'react';
import {observer} from 'mobx-react';
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
      isActiveClip: true
    });

    //
  };

  return (
    <div>
      <video className='test' />
      <div className='timeLine'>
        <div className='deel1' />
        <div className='clipsHolder' ref={clipsHolder}>
          {store.clips.map(clip => {
            return <Clip key={`${clip.fileUrl} + clip`} data={clip} />;
          })}
        </div>
        <div className='uploadBar'>
          <label htmlFor='uploadFile'>
            <input
              type='file'
              accept='video/*,image/*'
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
