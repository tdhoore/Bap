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

    //video editor
    this.clips = [];
    this.activeClipUrl = '';
    this.totalClipsLength = 0;
    this.progressBarMove = 0;
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

    //set new active clip
    this.activeClipUrl = this.clips[0].fileUrl;

    //set active clip
    this.clips[0].isActiveClip = true;
  }

  setDurrationIfVideo(data, newDuration) {
    //is video?
    //if yes change duration
    if (data.isVideo) {
      //duration to time stamp
      const duration = this.calcDuration(newDuration);

      //get the clip
      this.clips.forEach((clip, index) => {
        if (clip.fileUrl === data.fileUrl) {
          //set the new duration
          this.clips[index].duration = duration;
        }
      });
    }

    //add to total clips length
    this.totalClipsLength += newDuration;

    //set clips length in persentages
    this.clips.forEach(clip => {
      clip.clipLength = Math.round(
        this.mapVal(
          this.durationToSeconds(clip.duration),
          0,
          this.totalClipsLength,
          0,
          100
        )
      );
    });
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

  setProgressBarValue(totalDurationVideos, indexCurrent) {
    if (this.clips[indexCurrent].isActiveClip) {
      //get start time
      let startTime = totalDurationVideos;
      //loop through videos if more than 1
      if (this.clips.length > 1 && indexCurrent !== 0) {
        if (indexCurrent === this.clips.length - 1) {
          //is the last video
          startTime -= this.durationToSeconds(
            this.clips[this.clips.length - 1].duration
          );
        } else {
          // is not the last video
          this.clips.forEach((clip, index) => {
            if (index > indexCurrent) {
              //- this.durationToSeconds()
              startTime -= this.durationToSeconds(clip.duration);
            }
          });
        }
      } else {
        //only one video
        startTime = 0;
      }

      //calc percentage of the bar
      const percentage = Math.floor((100 / totalDurationVideos) * startTime);

      //set value of the progressbar
      this.progressBarMove = percentage;
    }
  }

  calcDuration(duration) {
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
  moveClip: action
});

const store = new Store();
export default store;
