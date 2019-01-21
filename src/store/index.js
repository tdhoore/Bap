/* eslint-disable no-unused-vars */
import {
  decorate,
  observable,
  action,
  computed,
  configure
} from 'mobx';
import fire from '../config/Fire';
//import RandomGame from "../models/RandomGame";
//import PlayListGame from "../models/PlayListGame";
//import Api from "../api/playList";

class Store {
  constructor() {
    this.user = null;
    this.email;
    this.password = '';
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.user;
      } else {
        this.user = null;
      }
    });
  }

  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.email, this.password).catch(error => {
      console.log(error);
    });
  }

  signup(e) {
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.email, this.password).then(u => {console.log(u);})
      .catch(error => {
        console.log(error);
      });
  }

  handleChangeLogin(e) {
    const input = e.currentTarget;
    this.email = '';
    console.log(`input:`, input.name);
    if (input.name === 'email') {
      console.log(`email input:`, this.email);
      this.email = input.value;
    } else {
      this.password = input.value;
    } 
  }
}



decorate(Store, {
  user: observable,
  login: action,
  signup: action,
  handleChangeLogin: action,
  email: observable,
  password: observable,
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
