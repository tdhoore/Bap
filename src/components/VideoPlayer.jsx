// eslint-disable-next-line no-unused-vars
import React from 'react';
import {observer} from 'mobx-react';

const VideoPlayer = ({store}) => {
  return (
    <div className='videoPlayer'>
      <video width='320' height='240' controls>
        <source src='../assets/video/vid.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>
      <img src='../assets/img/pic.jpg' />
    </div>
  );
};

export default observer(VideoPlayer);
