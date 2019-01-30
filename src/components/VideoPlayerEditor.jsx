// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";
import Step from "./Step.jsx";
//import video from '../assets/video/vid.mp4';
import img from "../assets/img/pic.jpg";

const VideoPlayerEditor = ({ store, videos, editorType }) => {
  const videoRef = React.createRef();
  const progressRef = React.createRef();

  const scrubberRef = React.createRef();

  const noteFormRef = React.createRef();
  const noteInputRef = React.createRef();
  const notesHolderRef = React.createRef();
  let noteElems = false;

  const cssOutroVidRef = React.createRef();

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

    //const scrubber = scrubberRef.current;

    const activeClip = store.clips[store.activeClipIndex];

    //find the active clip
    //const videoIndex = store.activeClipIndex;

    //calc the percentages to add
    /*let percentageToAdd = 0;

    if (videoIndex > 0) {
      store.clips.forEach((clip, index) => {
        //check if in range
        if (videoIndex > index) {
          percentageToAdd += clip.clipLength;
        }
      });
    }*/

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

      //if upload project start animation
      if (editorType === 0) {
        //show css animation
        cssOutroVidRef.current.classList.add(`cssOutroVidShow`);
      }

      if (store.activeClipIndex < store.clips.length - 1) {
        //handle end video
        handleEndVideo(store.activeClipIndex);
      }
    }

    //get total width of the progressbar
    /*const progressTotalWidth = progressElem.offsetWidth;

    //calc the distance of the bar
    const progress = (progressTotalWidth / 100) * progressElem.value;

    //move scubber
    scrubber.style.transform = `translateX(${progress}px)`;

    //display note
    displayNote($videoElem.currentTime);*/
  };

  /*const displayNote = dur => {
    console.log(dur);
    //is there a comment here
    store.notesCurrentProject.forEach((noteData, index) => {
      if (noteData.timeStamp < dur + 1 && noteData.timeStamp > dur - 1) {
        //there is a comment here

        //check if there are comment elemets
        if (!noteElems) {
          //no so create them
          const commentsHolder = notesHolderRef.current;
          noteElems = [...commentsHolder.querySelectorAll(`.comment`)];
        }

        //hide all other comments and display this one
        noteElems.forEach((commentElem, indexElems) => {
          if (indexElems === index) {
            //show this
            commentElem.classList.remove(`hide`);
          } else {
            //hide this
            commentElem.classList.add(`hide`);
          }
        });
      }
    });
  };

  const handleClickScrubber = e => {
    const videoElem = videoRef.current;
    const commentFormElem = noteFormRef.current;

    //pause video
    videoElem.pause();

    //show the comment option
    commentFormElem.classList.toggle(`hide`);
  };*/

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
      return "hide";
    } else {
      return "";
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

    return "";
  };

  const setvideoRef = video => {
    //the active clip is the video we want to reference
    if (video.isActiveClip) {
      return videoRef;
    }

    return null;
  };

  /*const handleSaveNote = e => {
    e.preventDefault();
    //get input
    const commentInput = noteInputRef.current;
    const videoElem = videoRef.current;

    //collect data
    const data = {
      note: "",
      timeStamp: 0
    };

    //collect comment
    data.note = commentInput.value;

    //collect timeStamp
    data.timeStamp = videoElem.currentTime;

    //send comment
    console.log(`send ${data.note} at ${data.timeStamp}`);
    store.notesCurrentProject.push(data);

    console.log(store.notesCurrentProject);

    return false;
  };*/

  return (
    <div className="videoPlayer">
      <div className="contentHolder">
        {videos.map((video, index) => {
          return (
            <video
              key={`${video.fileUrl}mainClip`}
              height="240"
              ref={setvideoRef(video)}
              onTimeUpdate={e => handleUpdateTime(e)}
              src={video.fileUrl}
              className={isActiveVideo(video)}
              onEnded={e => addEndedEvent(index, video)}
              muted
            />
          );
        })}
        <div className="cssOutroVid" ref={cssOutroVidRef}>
          css
        </div>
      </div>
      <div className="videoControls">
        <button className="playBtn" onClick={e => handleStartStop(e)}>
          Play/pause
        </button>
        <div className="progressBarHolder">
          <div
            className="scrubber"
            ref={scrubberRef}
            onClick={e => handleClickScrubber(e)}
          />
          <div className="commentsHolder" ref={notesHolderRef}>
            {store.notesCurrentProject.map((noteData, index) => {
              return (
                <div key={`note${index}`} className="comment hide">
                  {noteData.note}
                </div>
              );
            })}
          </div>
          <progress
            value="0"
            max="100"
            ref={progressRef}
            onMouseDown={e => handleProgressBarDown(e)}
            onMouseUp={e => handleProgressBarUp(e)}
            onMouseMove={e => handleMoveMouseProgressBar(e)}
            onClick={e => handleProgressBarClick(e)}
          />
          <button
            className="fullScreenBtn"
            onClick={e => handleGoFullscreen(e)}
          >
            Fullscreen
          </button>
          <form className="miniComment hide" ref={noteFormRef}>
            <input type="text" className="timeStamp" ref={noteInputRef} />
            <input type="submit" onClick={e => handleSaveNote(e)} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default observer(VideoPlayerEditor);
