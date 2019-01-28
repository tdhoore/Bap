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
import React from "react";
import { Route, Redirect } from "react-router-dom";

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

  // authListener = () => {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       this.user;
  //     } else {
  //       this.user = null;
  //     }
  //   });
  // }

  test = () => {
    const testDocumentRef = this.db.collection('projects').doc('firstproject');
  }

  login = (e) => {
    const {email, password, feedback} = e;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user;
        console.log('user:', user);
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      })
      .catch(error => {
        error.message = feedback;
      });
  }

  register = (e) => {
    const {email, password, feedback} = e;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(u => {
        console.log(u);
      })
      .catch(error => {
        console.log(error);
        error.message = feedback;
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
