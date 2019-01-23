// eslint-disable-next-line no-unused-vars
import React from 'react';
import {observer} from 'mobx-react';
import Step from './Step.jsx';
//import video from '../assets/video/vid.mp4';
import img from '../assets/img/pic.jpg';

const VideoPlayerEditor = ({store, videos}) => {
  const videoRef = React.createRef();
  const progressRef = React.createRef();

  const togglePlay = () => {
    const $videoElem = videoRef.current;

    if ($videoElem.paused) {
      //set start time
      if ($videoElem.currentTime === 0) {
        $videoElem.currentTime = store.clips[store.activeClipIndex].clipStart;
      }

      $videoElem.play();
    } else {
      $videoElem.pause();
    }
  };

  const handleUpdateTime = () => {
    //update progress bar
    const $videoElem = videoRef.current;
    const progressElem = progressRef.current;

    const activeClip = store.clips[store.activeClipIndex];

    //find the active clip
    const videoIndex = store.activeClipIndex;

    //calc the percentages to add
    let percentageToAdd = 0;

    if (videoIndex > 0) {
      store.clips.forEach((clip, index) => {
        //check if in range
        if (videoIndex > index) {
          percentageToAdd += clip.clipLength;
        }
      });
    }

    //calc correct percentage
    let currentDurTotal = store.mapVal(
      $videoElem.currentTime - store.clips[0].clipStart,
      0,
      store.totalClipsLength,
      0,
      100
    );

    if (store.activeClipIndex > 0) {
      store.clips.forEach((clip, index) => {
        //check if in range
        if (store.activeClipIndex > index) {
          currentDurTotal += store.mapVal(
            clip.duration,
            0,
            store.totalClipsLength,
            0,
            100
          );
        }
      });
    }

    //add the percentages together and make the final bar value
    progressElem.value = currentDurTotal;

    //detect end of active clip AND if there is a next clip
    //pause if
    if ($videoElem.currentTime >= activeClip.duration + activeClip.clipStart) {
      $videoElem.pause();

      if (store.activeClipIndex < store.clips.length - 1) {
        //handle end video
        handleEndVideo(store.activeClipIndex);
      }
    }
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
    const newValue = (100 / progressElem.offsetWidth) * newPos;

    //set new value on progressbar
    progressElem.value = newValue;

    //calc and set active clip
    store.updateActiveClip(store.getActiveClipIndex(newValue));

    let currentDurTotal = store.mapVal(
      newValue,
      0,
      100,
      0,
      store.totalClipsLength
    );

    //add the start duration
    currentDurTotal += store.clips[0].clipStart;

    if (store.activeClipIndex > 0) {
      store.clips.forEach((clip, index) => {
        //check if in range
        if (store.activeClipIndex > index) {
          currentDurTotal -= clip.duration;
        }
      });
    }

    //set new value on video
    videoElem.currentTime = Math.floor(currentDurTotal);
  };

  const handleProgressBarDown = e => {
    //update video
    changeVideosCurrentTime(e);

    //set mouse to down over progressbar
    store.isMouseDownOverProgressBar = true;
  };

  const handleProgressBarClick = e => {
    //update video
    //changeVideosCurrentTime(e);
  };

  const handleProgressBarUp = () => {
    //play the video
    //videoRef.current.play();

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

  const handleEndVideo = indexIn => {
    // handle the store update
    store.playNextClip(indexIn);

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

        //set new start duration of clip
        video.currentTime = store.clips[indexIn + 1].clipStart;

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
            onClick={e => handleProgressBarClick(e)}
          />
          <button
            className='fullScreenBtn'
            onClick={e => handleGoFullscreen(e)}
          >
            Fullscreen
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(VideoPlayerEditor);
