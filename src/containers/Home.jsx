/* eslint-disable no-unused-vars */
import Firebase from '../components/Firebase/Fire.js';
import {observer} from 'mobx-react';
import React from 'react';
// import video from '../assets/video/vid.mp4';

const Home = () => {
  return (
    <div className='videoPlayer'>
      <video src='../src/assets/video/vid.mp4' />
      <p>TEST</p>
    </div>
  );
};
  
export default observer(Home);