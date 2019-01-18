// eslint-disable-next-line no-unused-vars
import React from 'react';
import {observer} from 'mobx-react';

const Clip = ({store, data}) => {
  let classNames = `clip`;
  const videoRef = React.createRef();

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
        />
      );
    }
    //is image
    return <img src={data.fileUrl} />;
  };

  return (
    <div className={classNames}>
      {renderVideoOrImg(data.isVideo)}
      <p className='duration'>{data.duration}</p>
    </div>
  );
};

export default observer(Clip);
