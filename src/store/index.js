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
    this.activeClipUrl = newClip.fileUrl;
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

    //set clips length in persentages
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
  clips: observable
});

const store = new Store();
export default store;
