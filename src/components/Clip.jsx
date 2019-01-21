// eslint-disable-next-line no-unused-vars
import React from 'react';
import {observer} from 'mobx-react';

const Clip = ({store, data, index, totalClips}) => {
  let classNames = `clip`;

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
  };

  const handleEditStart = e => {};

  const handleEditEnd = e => {};

  const renderTrimerStart = () => {
    if (data.isActiveClip) {
      return (
        <button
          className='trimer trimerStart'
          onMouseDown={e => handleEditStart(e)}
        />
      );
    }
  };

  const renderTrimerEnd = () => {
    if (data.isActiveClip) {
      return (
        <button
          className='trimer trimerEnd'
          onMouseDown={e => handleEditEnd(e)}
        />
      );
    }
  };

  return (
    <div
      className={classNames}
      style={{width: `${data.clipLength}%`}}
      onClick={e => handleClickClip(e)}
    >
      {renderTrimerStart()}
      {renderPrevBtn()}
      {renderVideoOrImg(data.isVideo)}
      <p className='duration'>{data.duration}</p>
      {renderNextBtn()}
      {renderTrimerEnd()}
    </div>
  );
};

export default observer(Clip);
