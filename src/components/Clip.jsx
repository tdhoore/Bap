// eslint-disable-next-line no-unused-vars
import React from 'react';
import {observer} from 'mobx-react';

const Clip = ({store, data, index, totalClips}) => {
  let classNames = `clip`;

  const clipRef = React.createRef();
  const isMouseDownStartTrimmer = false;
  const isMouseDownEndTrimmer = false;

  //set active clip
  if (data.isActiveClip) {
    classNames += ` activeClip`;
  }

  const handleLoadMetaDeta = e => {
    //set new duration
    store.setDurrationIfVideo(data, e.currentTarget.duration);
  };

  const renderVideoOrImg = isVideo => {
    if (isVideo) {
      //is video
      return (
        <video
          src={data.fileUrl}
          onLoadedMetadata={e => handleLoadMetaDeta(e)}
          muted
        />
      );
    }
    //is image
    return <img src={data.fileUrl} />;
  };

  const handleClickNextAndPrevBtns = (e, counter) => {
    //move the clip
    store.moveClip(index, counter);
  };

  const renderPrevBtn = () => {
    if (index > 0) {
      return (
        <button
          className='moveClipBtn moveClipBtnPrev'
          onClick={e => handleClickNextAndPrevBtns(e, - 1)}
        />
      );
    }
  };

  const renderNextBtn = () => {
    if (index < totalClips) {
      return (
        <button
          className='moveClipBtn moveClipBtnNext'
          onClick={e => handleClickNextAndPrevBtns(e, 1)}
        />
      );
    }
  };

  const handleClickClip = e => {
    //set active if it's not jet
    if (!data.isActiveClip) {
      //search the current clip
      store.clips.forEach((clip, index) => {
        if (clip.fileUrl === data.fileUrl) {
          //set new active clip
          store.updateActiveClip(index);

          //calc the percentages to add
          let percentageToAdd = 0;

          if (index > 0) {
            store.clips.forEach((clip, indexInput) => {
              //check if in range
              if (index > indexInput) {
                percentageToAdd = clip.clipLength;
              }
            });
          }

          //update the progress bar
          store.progressBarValue = percentageToAdd;
        }
      });
    }

    //open trimmer window
    store.isTrimmerOpen = true;
  };

  /*const handleMouseDownStartTrimmer = e => {
    //set mouse down
    isMouseDownStartTrimmer = true;
  };

  const handleToggleStartTrimmer = e => {
    if (isMouseDownStartTrimmer) {
      isMouseDownStartTrimmer = false;
    } else {
      isMouseDownStartTrimmer = true;
    }
  };

  const handleEditStart = e => {
    //is the mouse down over trimmer
    if (isMouseDownStartTrimmer) {
      const trimmerElem = e.currentTarget;
      const parentLeftPos = trimmerElem.parentElement.getBoundingClientRect()
        .left;
      const parentWidth = trimmerElem.parentElement.offsetWidth;

      //calc new position
      const newPos = e.clientX - parentLeftPos;

      //move if value is positive
      if (newPos >= 0) {
        //move trimmer
        trimmerElem.style.transform = `translateX(${newPos}px)`;

        //calc to remove percetage
        const startPercent = Math.floor((100 / parentWidth) * newPos);

        //percentage to duration
        const startDuration = Math.floor((100 / data.duration) * startPercent);
        console.log(startDuration);
        //update start postion of the clip
      }
    }
  };

  const handleMouseUpStartTrimmer = e => {
    //set mouse up
    isMouseDownStartTrimmer = false;
  };

  const handleMouseDownEndTrimmer = e => {
    //set mouse down
    isMouseDownEndTrimmer = true;
  };

  const handleEditEnd = e => {
    //is the mouse down over trimmer
    if (isMouseDownEndTrimmer) {
    }
  };

  const handleMouseUpEndTrimmer = e => {
    //set mouse up
    isMouseDownEndTrimmer = false;
  };

  const renderTrimerStart = () => {
    if (data.isActiveClip) {
      return (
        <button
          className='trimer trimerStart'
          //onMouseDown={e => handleMouseDownStartTrimmer(e)}
          onClick={e => handleToggleStartTrimmer(e)}
          onMouseMove={e => handleEditStart(e)}
          //onMouseUp={e => handleMouseUpStartTrimmer(e)}
          //onMouseLeave={e => handleMouseUpStartTrimmer(e)}
        />
      );
    }
  };

  const renderTrimerEnd = () => {
    if (data.isActiveClip) {
      return (
        <button
          className='trimer trimerEnd'
          onMouseDown={e => handleMouseDownEndTrimmer(e)}
          onMouseMove={e => handleEditEnd(e)}
          onMouseUp={e => handleMouseUpEndTrimmer(e)}
        />
      );
    }
  };*/

  return (
    <div
      className={classNames}
      style={{width: `${data.clipLength}%`}}
      onClick={e => handleClickClip(e)}
      ref={clipRef}
    >
      {renderPrevBtn()}
      {renderVideoOrImg(data.isVideo)}
      <p className='duration'>{store.calcDurationStamp(data.duration)}</p>
      {renderNextBtn()}
    </div>
  );
};

export default observer(Clip);
