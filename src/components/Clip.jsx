// eslint-disable-next-line no-unused-vars
import React from 'react';
import {observer} from 'mobx-react';

const Clip = ({store, data, index, totalClips}) => {
  let classNames = `clip`;

  const clipRef = React.createRef();

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
          onClick={e => handleClickClip(e)}
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
    /*if (!data.isActiveClip) {
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
    }*/
    console.log(`text`);
    //set as active clip
    if (!data.isActiveClip) {
      //search the current clip
      store.clips.forEach((clip, index) => {
        if (clip.id === data.id) {
          //set new active clip
          store.updateActiveClip(index);
        }
      });
    }

    //open trimmer window
    store.isTrimmerOpen = true;
  };

  return (
    <div
      className={classNames}
      style={{width: `${data.clipLength}%`}}
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
