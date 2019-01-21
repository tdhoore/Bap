// eslint-disable-next-line no-unused-vars
import React from 'react';
import {observer} from 'mobx-react';
import Step from './Step.jsx';
//import video from '../assets/video/vid.mp4';
import img from '../assets/img/pic.jpg';

const VideoPlayerEditor = ({store, videos}) => {
  const videoRef = React.createRef();
  const progressRef = React.createRef();

  let totalDurationVideos = 0;

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
    const $videoElem = videoRef.current;

    //find the active clip
    let videoIndex = 0;

    store.clips.forEach((clip, index) => {
      if (clip.isActiveClip) {
        videoIndex = index;
      }
    });

    //calc the percentages to add
    let percentageToAdd = 0;

    if (videoIndex > 0) {
      store.clips.forEach((clip, index) => {
        //check if in range
        if (videoIndex > index) {
          percentageToAdd = clip.clipLength;
        }
      });
    }

    //calc correct percentage
    const percentage = Math.floor(
      (100 / totalDurationVideos) * $videoElem.currentTime
    );

    //add the percentages together and make the final bar value
    store.progressBarValue = percentage + percentageToAdd;
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
    store.progressBarValue = newValue;

    //find wich video needs top be set active and played
    //use new value as a guide
    let videoIndex = 0;

    videoIndex = store.getActiveClipIndex(newValue);

    //set new active video
    store.updateActiveClip(videoIndex);

    //set new value on video
    videoElem.currentTime =
      totalDurationVideos *
      ((store.progressBarValue - store.calcToRemoveTime(videoIndex)) / 100);
  };

  const handleProgressBarDown = e => {
    //update video
    //changeVideosCurrentTime(e);

    //set mouse to down over progressbar
    store.isMouseDownOverProgressBar = true;
  };

  const handleProgressBarClick = e => {
    //update video
    changeVideosCurrentTime(e);
  };

  const handleProgressBarUp = () => {
    //play the video
    videoRef.current.play();

    //set mouse to up over progressbar
    store.isMouseDownOverProgressBar = false;
  };

  const handleMoveMouseProgressBar = e => {
    //update location duren mouse move
    if (store.isMouseDownOverProgressBar) {
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

  const handleEndVideo = index => {
    // handle the store update
    store.playNextClip(index);

    //get ref
    const oldVideo = videoRef.current;

    //get the other video's
    const oldVideos = oldVideo.parentElement.querySelectorAll(`video`);

    //index next video
    let newVideoIndex = 0;

    //hide the all the videos except the new video
    [...oldVideos].forEach((video, index) => {
      if (video === oldVideo) {
        newVideoIndex = index + 1;
      }

      if (index === newVideoIndex) {
        //is new video
        video.classList.remove(`hide`);

        //play video
        video.play();
      } else {
        //is other video
        video.classList.add(`hide`);
      }
    });
  };

  const addEndedEvent = (index, video) => {
    if (index !== videos.length - 1 && video.isActiveClip) {
      return handleEndVideo(index);
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

          return (
            <video
              key={`${video.fileUrl}mainClip`}
              height='240'
              ref={setvideoRef(video)}
              onTimeUpdate={e => handleUpdateTime(e)}
              src={video.fileUrl}
              className={isActiveVideo(video)}
              onEnded={e => addEndedEvent(index, video)}
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
            value={store.progressBarValue}
            max='100'
            ref={progressRef}
            onMouseDown={e => handleProgressBarDown(e)}
            onMouseUp={e => handleProgressBarUp(e)}
            onMouseMove={e => handleMoveMouseProgressBar(e)}
            onClick={e => handleProgressBarClick(e)}
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

export default observer(VideoPlayerEditor);
