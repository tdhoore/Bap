import {decorate, observable, action, computed, configure} from 'mobx';
//import RandomGame from "../models/RandomGame";
//import PlayListGame from "../models/PlayListGame";
//import Api from "../api/playList";

class Store {
  /*playtime = 0;
  allGames = [];
  randomGamesList = [];
  playList = [];
  isLogin = true;*/

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
  /*playtime: observable,
  randomGamesList: observable,
  playList: observable,
  allGames: observable,
  isLogin: observable,
  loginOrRegister: action,
  addToRandomGame: action,
  removeFrom: action,
  updateRandomGame: action,
  addToPlayListGame: action,
  updatePlayListGame: action,
  updateOneValue: action,
  calcPlayTime: action*/
});

const store = new Store();
export default store;
