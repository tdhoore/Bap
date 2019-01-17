import {
  decorate,
  observable,
  action,
  computed,
  configure
} from 'mobx';
//import RandomGame from "../models/RandomGame";
//import PlayListGame from "../models/PlayListGame";
//import Api from "../api/playList";

configure({
  enforceActions: true
});

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
  }

}
decorate(Store, {
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
