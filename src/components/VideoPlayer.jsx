// eslint-disable-next-line no-unused-vars
import React from 'react';
import {observer} from 'mobx-react';
import Step from './Step.jsx';
//import video from '../assets/video/vid.mp4';
import img from '../assets/img/pic.jpg';

const VideoPlayer = ({store, videos}) => {
  const videoRef = React.createRef();
  const progressRef = React.createRef();

  let totalDurationVideos = 0;

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
      (100 / totalDurationVideos) * $videoElem.currentTime
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
    videoElem.currentTime = totalDurationVideos * (progressElem.value / 100);
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

  const handleEndVideo = (e, index) => {
    //video ended
    console.log(`${index} video ended`);
  };

  const addEndedEvent = (e, index) => {
    if (index !== videos.length - 1) {
      return handleEndVideo(e, index);
    }

    return '';
  };

  const setTotalDurationVideos = (video, index) => {
    //reset the total at start of the loop
    if (index === 0) {
      totalDurationVideos = 0;
    }

    //set total duration of all the clips
    totalDurationVideos += store.durationToSeconds(video.duration);
  };

  const setvideoRef = video => {
    //the active clip is the video we want to reference
    if (video.isActiveClip) {
      return videoRef;
    }

    return null;
  };

  return (
    <div className='videoPlayer'>
      <div className='contentHolder'>
        {videos.map((video, index) => {
          //set total duration
          setTotalDurationVideos(video, index);

          //set new progress value
          //store.setProgressBarValue(totalDurationVideos, index);

          return (
            <video
              key={`${video.fileUrl}mainClip`}
              height='240'
              ref={setvideoRef(video)}
              onTimeUpdate={e => handleUpdateTime(e)}
              src={video.fileUrl}
              className={isActiveVideo(video)}
              onEnded={e => addEndedEvent(e, index)}
              muted
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
            value={store.progressBarMove}
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
