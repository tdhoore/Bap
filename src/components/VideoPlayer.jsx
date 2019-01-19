// eslint-disable-next-line no-unused-vars
import React from 'react';
import {observer} from 'mobx-react';
import Step from './Step.jsx';
//import video from '../assets/video/vid.mp4';
import img from '../assets/img/pic.jpg';

const VideoPlayer = ({store, videos}) => {
  const videoRef = React.createRef();
  const progressRef = React.createRef();
  //const scrubberRef = React.createRef();

  let isMouseDownOverProgressBar = false;

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
  };

  const handleStartStop = () => {
    //start and stop the video
    togglePlay();
  };

  const changeVideosCurrentTime = e => {
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
  };

  const handleProgressBarDown = e => {
    //update video
    changeVideosCurrentTime(e);

    //set mouse to down over progressbar
    isMouseDownOverProgressBar = true;
  };

  const handleProgressBarUp = () => {
    //play the video
    videoRef.current.play();

    //set mouse to up over progressbar
    isMouseDownOverProgressBar = false;
  };

  const handleMoveMouseProgressBar = e => {
    //update location duren mouse move
    if (isMouseDownOverProgressBar) {
      changeVideosCurrentTime(e);
    }
  };

  const handleGoFullscreen = () => {};

  const isActiveVideo = video => {
    if (!video.isActiveClip) {
      return 'hide';
    } else {
      return '';
    }
  };

  return (
    <div className='videoPlayer'>
      <div className='contentHolder'>
        {videos.map(video => {
          return (
            <video
              key={`${video.fileUrl}mainClip`}
              height='240'
              ref={videoRef}
              onTimeUpdate={e => handleUpdateTime(e)}
              src={video.fileUrl}
              className={isActiveVideo(video)}
            />
          );
        })}
        <div className='imageHolder' data-id='1' />
      </div>
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
            onMouseMove={e => handleMoveMouseProgressBar(e)}
          />
          <div className='stepsHolder' />
        </div>
        <button className='fullScreenBtn' onClick={e => handleGoFullscreen(e)}>
          Fullscreen
        </button>
      </div>
    </div>
  );
};

export default observer(VideoPlayer);
