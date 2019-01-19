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

  return (
    <div className={classNames} style={{width: `${data.clipLength}%`}}>
      {renderPrevBtn()}
      {renderVideoOrImg(data.isVideo)}
      <p className='duration'>{data.duration}</p>
      {renderNextBtn()}
    </div>
  );
};

export default observer(Clip);
