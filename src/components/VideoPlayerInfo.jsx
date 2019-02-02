// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";
import Step from "./Step.jsx";
import video from "../assets/video/vid.mp4";
import img from "../assets/img/pic.jpg";

const VideoPlayer = ({ store }) => {
  const videoRef = React.createRef();
  const progressRef = React.createRef();

  let isMouseDownOverProgressBar = false;

  const timeStamp = 1;
  let hasAskedForLocation = false;

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

    // check for time stamp
    if (timeStamp === $progressBar.value && !hasAskedForLocation) {
      //disable multiple tries
      hasAskedForLocation = true;

      //ask location
      askForLocation();
    }
  };

  const askForLocation = () => {
    if ("geolocation" in navigator) {
      //get and store location
      navigator.geolocation.watchPosition(saveLocation);
    }
  };

  const saveLocation = position => {
    console.log(position);
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
    //videoRef.current.play();

    //hide comment form if needed
    //commentFormRef.current.classList.add(`hide`);

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

  return (
    <article className="videoPlayerInfo">
      <header className="hide">
        <h2>info video</h2>
      </header>
      <div className="infoVideoHolder">
        <video ref={videoRef} onTimeUpdate={e => handleUpdateTime(e)}>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="imageHolder" data-id="1" />
      </div>
      <div className="videoControls">
        <button className="playBtn" onClick={e => handleStartStop(e)}>
          Play/pause
        </button>
        <div className="progressBarHolder">
          <progress
            value="0"
            max="100"
            ref={progressRef}
            onMouseDown={e => handleProgressBarDown(e)}
            onMouseUp={e => handleProgressBarUp(e)}
            onMouseMove={e => handleMoveMouseProgressBar(e)}
          />
          <div className="stepsHolder" />
        </div>
        <button className="fullScreenBtn" onClick={e => handleGoFullscreen(e)}>
          Fullscreen
        </button>
      </div>
    </article>
  );
};

export default observer(VideoPlayer);
