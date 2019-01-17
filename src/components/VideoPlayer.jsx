// eslint-disable-next-line no-unused-vars
import React from 'react';
import {observer} from 'mobx-react';
import video from '../assets/video/vid.mp4';

const VideoPlayer = ({store}) => {
  const videoRef = React.createRef();
  const progressRef = React.createRef();

  const handleUpdateTime = e => {
    //update progress bar
    const $progressBar = progressRef.current;
    const $videoElem = videoRef.current;
    const percentage = Math.floor(
      (100 / $videoElem.duration) * $videoElem.currentTime
    );

    $progressBar.value = percentage;
  };

  const handleStartStop = e => {
    //start and stop the video
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
          <progress value='0' max='100' ref={progressRef} />
        </div>
        <button className='fullScreenBtn'>Fullscreen</button>
      </div>
    </div>
  );
};

export default observer(VideoPlayer);
