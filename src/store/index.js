/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import {
  decorate,
  observable,
  action,
  computed,
  configure
} from 'mobx';

import * as firebase from 'firebase';
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
    this.fs = firebase.firestore();

  this.user = false;
  this.authenticated = false;
  this.history = null;
  }

    // componentDidMount() {
  //   this.firebaseListener = firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       this.authenticated = true;
  //       this.currentUser = user;
  //     } else {
  //       this.authenticated = false;
  //       this.currentUser = null;
  //     }
  //   });
  // }

  // componentWillUnmount() {
  //   this.firebaseListener = undefined;
  // }

  // authListener() {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //     this.user = firebase.auth().currentUser;
  //       // this.user;
  //       <Redirect
  //         to={{
  //           pathname: "/",
  //         }}
  //       />
  //     } else {
  //       this.user = null;
  //     }
  //   });
  // }

  login(e) {
    const {email, password, feedback} = e;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(result => {
        this.user = result.user;
        console.log('user:', this.user);
        this.authenticated = true;
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
  register: action,
  authListener: action,
  handleChangeLogin: action,
  email: observable,
  password: observable,
  authenticated: observable,
  currentUser: observable,
});


const store = new Store();
export default store;
