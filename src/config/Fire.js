import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCL-E4wSU4FrQ_CHzciHl3H5pLEYnD7LPg',
  authDomain: 'bap-firebase.firebaseapp.com',
  databaseURL: 'https://bap-firebase.firebaseio.com',
  projectId: 'bap-firebase',
  storageBucket: 'bap-firebase.appspot.com',
  messagingSenderId: '573194971360'
};
const fire = firebase.initializeApp(config);
export default fire;