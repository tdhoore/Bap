// eslint-disable-next-line no-unused-vars
import React from 'react';
import {observer} from 'mobx-react';
import video from '../assets/video/vid.mp4';

const VideoPlayer = ({store}) => {
  const videoRef = React.createRef();
  const progressRef = React.createRef();
  //const scrubberRef = React.createRef();

  const togglePlay = () => {
    const $videoElem = videoRef.current;

    if ($videoElem.paused) {
      $videoElem.play();
    } else {
      $videoElem.pause();
    }
  };

  const handleUpdateTime = () => {
    //update progress bar
    const $progressBar = progressRef.current;
    const $videoElem = videoRef.current;
    const percentage = Math.floor(
      (100 / $videoElem.duration) * $videoElem.currentTime
    );

    $progressBar.value = percentage;

    //update location scrubber
    //const newPosition = ($progressBar.offsetWidth / 100) * percentage;
    //scrubberRef.current.style.transform = `translateX(${newPosition}px)`;
    //console.log(newPosition);
  };

  const handleStartStop = () => {
    //start and stop the video
    togglePlay();
  };

  const handleProgressBarDown = e => {
    const videoElem = videoRef.current;
    const progressElem = progressRef.current;

    //pause the video
    videoElem.pause();

    //get new position
    const newPos = e.clientX - e.currentTarget.getBoundingClientRect().left;
    const newValue = Math.floor((100 / progressElem.offsetWidth) * newPos);

    //set new value on progressbar
    progressElem.value = newValue;

    //set new value on video
    videoElem.currentTime = videoElem.duration * (progressElem.value / 100);
    console.log(videoElem.currentTime);
  };

  const handleProgressBarUp = () => {
    //play the video
    videoRef.current.play();
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
          <progress
            value='0'
            max='100'
            ref={progressRef}
            onMouseDown={e => handleProgressBarDown(e)}
            onMouseUp={e => handleProgressBarUp(e)}
          />
        </div>
        <button className='fullScreenBtn'>Fullscreen</button>
      </div>
    </div>
  );
};

export default observer(VideoPlayer);
