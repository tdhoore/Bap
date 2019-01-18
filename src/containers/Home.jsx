/* eslint-disable no-unused-vars */
import fire from '../config/Fire.js';
import {observer} from 'mobx-react';

const Home = () => {
  return (
    <div className='videoPlayer'>
      <video src='./assets/video/vid.mp4' />
    </div>
  );
};
  
export default observer(Home);