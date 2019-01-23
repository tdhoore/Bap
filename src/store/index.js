import {decorate, observable, action, computed, configure} from 'mobx';
import {resultKeyNameFromField} from 'apollo-utilities';
//import Api from "../api/playList";

class Store {
  constructor() {
    //this.api = new Api();
    //normaal van de steam api maar die werkt enkel online
    //this.getFromApi(`../data/allUserGames.json`);

    //per project andere stappen opvragen
    this.activeProject = 0;
    this.currentStep = 0;

    //video player
    this.progressBarValue = 0;
    this.isMouseDownOverProgressBar = false;

    //video editor
    this.activeClipIndex = 0;
    this.clipId = 0;
    this.clips = [];
    this.totalClipsLength = 0;

    //trimmer
    this.isTrimmerOpen = false;
    this.minClipduration = 5;
    this.maxClipduration = 30;
    this.maxTotalDuration = 60;
    this.isMouseDownOverTrimmer = false;
  }

  updateProgress(val) {
    this.progressBarValue = val;
  }

  getActiveClipIndex(newValue) {
    let clipStartPercent = 0;

    let videoIndex = 0;

    store.clips.forEach((clip, index) => {
      const clipEndPercent = clipStartPercent + clip.clipLength;

      //check if in range
      if (clipStartPercent <= newValue && clipEndPercent >= newValue) {
        videoIndex = index;
      }

      //add to start percetage
      clipStartPercent = clipEndPercent;
    });

    //set global var
    this.activeClipIndex = videoIndex;

    return videoIndex;
  }

  calcToRemoveTime(videoIndex) {
    let toRemoveTime = 0;

    store.clips.forEach((clip, index) => {
      if (videoIndex !== 0 && index < videoIndex) {
        toRemoveTime += clip.clipLength;
      }
    });

    return toRemoveTime;
  }

  addClipToTimeLine(newClip) {
    //remove active class from clips
    this.clips.forEach((clip, index) => {
      if (clip.isActiveClip) {
        this.clips[index].isActiveClip = false;
      }
    });

    //add to clips
    this.clips.push(newClip);

    //set active clip
    this.clips[0].isActiveClip = true;

    //add to clip id
    this.clipId ++;
  }

  setDurrationIfVideo(data, duration) {
    //is video?
    //if yes change duration
    if (data.isVideo) {
      const maxDuration = duration;

      //clip duration to the max duration of a clip
      if (duration > this.maxClipduration) {
        duration = this.maxClipduration;
      }

      //get the clip
      this.clips.forEach((clip, index) => {
        if (clip.fileUrl === data.fileUrl) {
          //set the new duration
          this.clips[index].duration = duration;

          //set clip max duration
          clip.maxDuration = maxDuration;
        }
      });

      //add to total clips length
      this.totalClipsLength += duration;

      //set clips length in persentages
      this.clips.forEach(clip => {
        clip.clipLength = Math.round(
          this.mapVal(clip.duration, 0, this.totalClipsLength, 0, 100)
        );
      });
    }
  }

  durationToSeconds(durationText) {
    const minutes = parseInt(durationText.substr(0, 2), 10);
    const seconds = parseInt(
      durationText.substr(durationText.length - 2, 2),
      10
    );

    return minutes * 60 + seconds;
  }

  mapVal(num, inMin, inMax, outMin, outMax) {
    return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  calcDurationStamp(duration) {
    let result = duration;
    let minutes = 0;
    let seconds = '0';

    //calculate the minutes
    minutes = Math.floor(duration / 60);

    //calcultate seconds
    seconds = Math.floor(duration - minutes * 60).toString();

    //add leading zero's if needed
    if (parseInt(seconds, 10) < 10) {
      seconds = `0${seconds}`;
    }

    //add together for result
    result = `${minutes}:${seconds}`;

    return result;
  }

  moveClip(currentIndex, direction) {
    //save old val
    const toSwapVal = this.clips[currentIndex + direction];

    //set the old val
    this.clips[currentIndex + direction] = this.clips[currentIndex];

    //swap in the new val
    this.clips[currentIndex] = toSwapVal;

    //set new active clip
    this.clips.forEach((clip, index) => {
      if (currentIndex + direction === index) {
        //is new active clip
        clip.isActiveClip = true;
      } else {
        //remove active clip
        clip.isActiveClip = false;
      }
    });

    //set new progressbar
    //check if first or not
    if (currentIndex + direction > 0) {
      this.progressBarValue =
        100 - this.calcToRemoveTime(currentIndex + direction);
    } else {
      this.progressBarValue = 0;
    }
  }

  playNextClip(index) {
    //set new video as active
    this.clips[index + 1].isActiveClip = true;

    //set old video as inactive
    this.clips[index].isActiveClip = false;
  }

  updateActiveClip(clipIndex) {
    this.clips.forEach((clip, index) => {
      if (index === clipIndex) {
        this.clips[index].isActiveClip = true;
      } else {
        this.clips[index].isActiveClip = false;
      }
    });
  }

  handleShowInstruction(e) {
    const elem = e.currentTarget;
    //get the id that is needed
    const stepId = elem.getAttribute(`data-id`);

    //search the data base for the correct image an caption

    //na ophaling plaats deze in de image holder

    //animeer de image in beeld

    //plaats de knop voor volgende op zijn plaats indien nodig

    //plaats de knop voor vorige op zijn plaats indien nodig

    //set self to active step
  }
}
decorate(Store, {
  handleShowInstruction: action,
  clips: observable,
  progressBarValue: observable,
  moveClip: action,
  playNextClip: action
});

const store = new Store();
export default store;
