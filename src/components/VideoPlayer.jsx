// eslint-disable-next-line no-unused-vars
import React from 'react';
import {observer} from 'mobx-react';

const VideoPlayer = ({store}) => {
  return (
    <div className='videoPlayer'>
      <video src='./assets/video/vid.mp4' />
    </div>
  );
};

export default observer(VideoPlayer);
