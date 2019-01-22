// eslint-disable-next-line no-unused-vars
import React from 'react';
import {observer} from 'mobx-react';
import video from '../assets/video/vid.mp4';

const Trimmer = ({store}) => {
  //use the active clipdata
  const activeClip = store.clips[store.activeClipIndex];

  let isStartTrimmer = true;

  const trimmerTimeLineRef = React.createRef();

  let startDuration = 0;
  let duration = 0;

  const clacMarginLeft = () => {
    if (Math.floor(activeClip.duration) > 0 && activeClip.maxDuration > 0) {
      return Math.floor(
        store.mapVal(activeClip.clipStart, 0, activeClip.maxDuration, 0, 100)
      );
    } else {
      return 0;
    }
  };

  const clacMarginRight = () => {
    const videoDuration = activeClip.duration;
    let marginRight = 0;

    //if videoDuration is less then the max use it instead
    if (videoDuration < store.maxClipduration) {
      marginRight = videoDuration;
    } else {
      marginRight = store.maxClipduration;
    }

    //calc margin right final
    return 100 - Math.floor((100 / activeClip.maxDuration) * marginRight);
  };

  const handleMouseDown = (e, isStart) => {
    //set mouse down
    store.isMouseDownOverTrimmer = true;

    //set isStartTrimmer
    isStartTrimmer = isStart;

    //addEventListeners fr move and up on the window
    window.addEventListener(`mousemove`, handleMoveMouse);

    if (isStart) {
      window.addEventListener(`mouseup`, handleUpMouseStart);
    } else {
      window.addEventListener(`mouseup`, handleUpMouseEnd);
    }
  };

  const handleMoveMouse = e => {
    //check if start or end trimmer
    if (isStartTrimmer) {
      //is start
      updateStartVal(e);
    } else {
      //is end
      updateEndVal(e);
    }
  };

  const updateStartVal = e => {
    console.log('start');
    const trimmerTimeLineElem = trimmerTimeLineRef.current;
    //get postion from 0
    const trimmerLeftPos = trimmerTimeLineElem.getBoundingClientRect().left;
    const trimmerWidth = trimmerTimeLineElem.offsetWidth;
    let newPos = e.clientX - trimmerLeftPos;

    //cap pos at 0
    if (newPos < 0) {
      newPos = 0;
    }

    //postion to percentage
    const startPercent = store.mapVal(newPos, 0, trimmerWidth, 0, 100);

    //percentage to duration
    let tempStartDuration = Math.floor(
      store.mapVal(startPercent, 0, 100, 0, activeClip.maxDuration)
    );

    //limit duration
    if (tempStartDuration >= activeClip.duration - store.minClipduration) {
      tempStartDuration = activeClip.duration - store.minClipduration;
    }

    //set start duration
    startDuration = tempStartDuration;

    //calc margin
    const margin = Math.floor(
      store.mapVal(tempStartDuration, 0, activeClip.maxDuration, 0, 100)
    );

    //temp update the margin for now
    trimmerTimeLineElem.querySelector(
      '.videoLength'
    ).style.marginLeft = `${margin}%`;
  };

  const updateEndVal = e => {
    console.log('end');
    const trimmerTimeLineElem = trimmerTimeLineRef.current;

    //get postion from 0
    const trimmerLeftPos = trimmerTimeLineElem.getBoundingClientRect().left;
    const trimmerWidth = trimmerTimeLineElem.offsetWidth;
    let newPos = e.clientX - trimmerLeftPos;

    //cap pos at the trimmer width
    if (newPos > trimmerWidth) {
      newPos = trimmerWidth;
    }

    //postion to percentage
    let endPercent = store.mapVal(newPos, 0, trimmerWidth, 0, 100);

    //cap pos at the max duration
    const maxEnd =
      store.mapVal(activeClip.clipStart, 0, activeClip.maxDuration, 0, 100) +
      store.mapVal(store.maxClipduration, 0, activeClip.maxDuration, 0, 100);

    if (endPercent > maxEnd) {
      endPercent = maxEnd;
    }

    //percentage to duration
    let tempEndDuration = Math.floor(
      store.mapVal(endPercent, 0, 100, 0, activeClip.maxDuration)
    );

    //limit duration
    if (tempEndDuration <= activeClip.clipStart + store.minClipduration) {
      tempEndDuration = activeClip.clipStart + store.minClipduration;
    }

    //set start duration
    duration = tempEndDuration - activeClip.clipStart;

    //calc margin
    const margin = Math.floor(
      store.mapVal(tempEndDuration, 0, activeClip.maxDuration, 0, 100)
    );

    //temp update the margin for now
    trimmerTimeLineElem.querySelector(
      '.videoLength'
    ).style.marginRight = `${100 - margin}%`;
  };

  const handleUpMouseStart = e => {
    //update margins
    store.clips[store.activeClipIndex].clipStart = startDuration;

    //remove listeners
    window.removeEventListener(`mousemove`, handleMoveMouse);
    window.removeEventListener(`mouseup`, handleUpMouseStart);
  };

  const handleUpMouseEnd = e => {
    //update margins
    if (duration !== 0) {
      store.clips[store.activeClipIndex].duration = duration;
    }

    //remove listeners
    window.removeEventListener(`mousemove`, handleMoveMouse);
    window.removeEventListener(`mouseup`, handleUpMouseEnd);
  };

  return (
    <div className='trimmerWindow'>
      <div className='videoTrimmer'>
        <video src={video} muted height='240' />
        <div className='trimmerTimeLine' ref={trimmerTimeLineRef}>
          <div
            className='videoLength'
            style={{
              marginLeft: `${clacMarginLeft()}%`,
              marginRight: `${clacMarginRight()}%`
            }}
          >
            <div
              className='trimer trimerStart'
              onMouseDown={e => handleMouseDown(e, true)}
            />
            <div
              className='trimer trimerEnd'
              onMouseDown={e => handleMouseDown(e, false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Trimmer);
