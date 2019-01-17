// eslint-disable-next-line no-unused-vars
import React from 'react';
import {observer} from 'mobx-react';

const Clip = ({data}) => {
  let classNames = `clip`;

  //set active clip
  if (data.isActiveClip) {
    classNames += ` activeClip`;
  }

  const renderVideoOrImg = isVideo => {
    if (isVideo) {
      //is video
      return <video src={data.fileUrl} />;
    }
    //is image
    return <img src={data.fileUrl} />;
  };

  return <div className={classNames}>{renderVideoOrImg(data.isVideo)}</div>;
};

export default observer(Clip);
