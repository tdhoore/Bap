// eslint-disable-next-line no-unused-vars
import React from "react";
import { observer } from "mobx-react";

const VideoPlayer = ({ store, comments, prototypeId = false, video }) => {
  const videoRef = React.createRef();
  const progressRef = React.createRef();
  const scrubberRef = React.createRef();
  const commentFormRef = React.createRef();
  const commentInputRef = React.createRef();
  const commentsHolderRef = React.createRef();
  let commentElems = [];

  let isMouseDownOverProgressBar = false;

  const togglePlay = e => {
    const $videoElem = videoRef.current;

    if ($videoElem.paused) {
      $videoElem.play();
      e.currentTarget.classList.add(`pauseBtn`);
    } else {
      $videoElem.pause();
      e.currentTarget.classList.remove(`pauseBtn`);
    }
  };

  const handleUpdateTime = () => {
    //update progress bar
    const $progressBar = progressRef.current;
    const $videoElem = videoRef.current;
    const scrubber = scrubberRef.current;

    const percentage = Math.floor(
      (100 / $videoElem.duration) * $videoElem.currentTime
    );

    $progressBar.value = percentage;

    //get total width of the progressbar
    const progressTotalWidth = $progressBar.offsetWidth;

    //calc the distance of the bar
    const progress = (progressTotalWidth / 100) * percentage;

    //move scubber
    scrubber.style.transform = `translateX(${progress}px)`;

    //display comment
    displayComment($videoElem.currentTime);
  };

  const handleStartStop = e => {
    //start and stop the video
    togglePlay(e);
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

    //remove comment class
    commentElems.forEach(commentElem => {
      commentElem.classList.remove(`commentShow`);
    });
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

  const handleClickScrubber = e => {
    const videoElem = videoRef.current;
    const commentFormElem = commentFormRef.current;

    //pause video
    videoElem.pause();

    //show the comment option
    commentFormElem.classList.toggle(`hideComment`);

    //hide scrubber
    e.currentTarget.classList.add(`hide`);
  };

  const handleSubmitComment = e => {
    e.preventDefault();
    //get input
    const commentInput = commentInputRef.current;
    const videoElem = videoRef.current;

    //collect data
    const data = {
      projectId: 0,
      userId: 0,
      comment: "",
      timeStamp: ""
    };

    if (commentInput.value !== "") {
      //collect comment
      data.comment = commentInput.value;

      //collect timeStamp
      data.timeStamp = videoElem.currentTime;

      //send comment
      console.log(`send ${data.comment} at ${data.timeStamp}`);
      //check if prototype or project
      if (!prototypeId) {
        //is project comment
        store.uploadComment(data.comment, data.timeStamp);
      } else {
        //is prototype comment
        store.uploadPrototypeComment(data.comment, data.timeStamp, prototypeId);
      }
    }

    //close comment section
    const commentFormElem = commentFormRef.current;
    const scrubber = scrubberRef.current;

    commentFormElem.classList.add(`hideComment`);
    scrubber.classList.remove(`hide`);

    return false;
  };

  const displayComment = dur => {
    //is there a comment here
    comments.forEach((commentData, index) => {
      if (
        commentData.timeStamp < dur + 0.5 &&
        commentData.timeStamp > dur - 0.5
      ) {
        //there is a comment here
        //check if there are comment elemets
        if (commentElems.length === 0) {
          //no so create them
          const commentsHolder = commentsHolderRef.current;
          commentElems = [...commentsHolder.querySelectorAll(`.comment`)];
        }

        //hide all other comments and display this one
        commentElems.forEach((commentElem, indexElems) => {
          if (indexElems === index) {
            //show this
            commentElem.classList.remove(`commentShow`);
          } else {
            //hide this
            commentElem.classList.add(`commentShow`);
          }
        });
      }
    });
  };

  const displayProfilepic = url => {
    if (url === null || url === undefined) {
      return "http://localhost:8080/assets/img/placeholder_profilepic.svg";
    } else {
      return url;
    }
  };

  return (
    <div className="videoPlayer">
      <div className="videoHolder">
        <video
          ref={videoRef}
          onTimeUpdate={e => handleUpdateTime(e)}
          src={`http://localhost:8080/${video}`}
        />
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
          <form className="miniComment hideComment" ref={commentFormRef}>
            <div className="commentImg">
              <img
                src="http://localhost:8080/assets/img/placeholder_profilepic.svg"
                alt="profiel foto"
              />
            </div>
            <input
              type="text"
              className="timeStamp"
              ref={commentInputRef}
              placeholder="plaats een reactie.."
            />
            <input type="submit" onClick={e => handleSubmitComment(e)} />
          </form>
          <div className="commentsHolder" ref={commentsHolderRef}>
            {comments.map((commentData, index) => {
              return (
                <div key={`comment${index}`} className="comment">
                  <div className="commentImg">
                    <img
                      src={displayProfilepic(commentData.profilepic)}
                      alt="profiel foto"
                    />
                  </div>
                  <p>{commentData.comment}</p>
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
          />
        </div>
        <button
          className="fullScreenBtn hide"
          onClick={e => handleGoFullscreen(e)}
        >
          Fullscreen
        </button>
      </div>
    </div>
  );
};

export default observer(VideoPlayer);
