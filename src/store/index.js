/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import {
  decorate,
  observable,
  action,
  computed,
  configure
} from 'mobx';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class Store {
  constructor() {

  const config = {
    apiKey: 'AIzaSyCL-E4wSU4FrQ_CHzciHl3H5pLEYnD7LPg',
    authDomain: 'bap-firebase.firebaseapp.com',
    databaseURL: 'https://bap-firebase.firebaseio.com',
    projectId: 'bap-firebase',
    storageBucket: 'bap-firebase.appspot.com',
    messagingSenderId: '573194971360'
  };
  
  firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.database();
  }

  authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      console.log('user:', user);
      if (user) {
        this.user;
      } else {
        this.user = null;
      }
    });
  }

  login = (e) => {
    const {email, password} = e;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user;
        console.log('user:', user);
      })
      .catch(error => {
        console.log(error);
      });
  }

  signup = (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(u => {console.log(u);})
      .catch(error => {
        console.log(error);
      });
  }

  handleChangeLogin(e) {
    const input = e.currentTarget;
    if (input.name === 'email') {
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
