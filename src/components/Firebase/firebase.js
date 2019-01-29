import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyCL-E4wSU4FrQ_CHzciHl3H5pLEYnD7LPg',
  authDomain: 'bap-firebase.firebaseapp.com',
  databaseURL: 'https://bap-firebase.firebaseio.com',
  projectId: 'bap-firebase',
  storageBucket: 'bap-firebase.appspot.com',
  messagingSenderId: '573194971360'
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }

  doCreateUserWithEmailAndPassword = (email, password) => {
    this.auth.createUserWithEmailAndPassword(email, password);
  }

  doSignInWithEmailAndPassword = (email, password) => {
    this.auth.signInWithEmailAndPassword(email, password);
  }

  doSignOut = () => {
    this.auth.signOut();
  }

  doPasswordReset = email => {
    this.auth.sendPasswordResetEmail(email);
  }

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = password => {
    this.auth.currentUser.updatePassword(password);
  }

}

export default Firebase;
