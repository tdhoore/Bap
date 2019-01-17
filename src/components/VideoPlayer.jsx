// eslint-disable-next-line no-unused-vars
import React from 'react';
import {observer} from 'mobx-react';
import video from '../assets/video/vid.mp4';

const VideoPlayer = ({store}) => {
  const videoRef = React.createRef();

  const handleUpdateTime = e => {
    console.log(e);
  };

  const handleStartStop = e => {
    const $videoElem = videoRef.current;

    if ($videoElem.paused) {
      $videoElem.play();
    } else {
      $videoElem.pause();
    }
  };

  return (
    <div className='videoPlayer'>
      <video
        width='320'
        height='240'
        ref={videoRef}
        onTimeUpdate={e => handleUpdateTime(e)}
      >
        <source src={video} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
      <div className='videoControls'>
        <button className='playBtn' onClick={e => handleStartStop(e)}>
          Play/pause
        </button>
        <div className='progressBarHolder'>
          <button className='progressBtn'>P</button>
          <progress value='0' max='100' />
        </div>
        <button className='fullScreenBtn'>Fullscreen</button>
      </div>
    </div>
  );
};

export default observer(VideoPlayer);
