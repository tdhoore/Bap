/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import {
  decorate,
  observable,
  action,
  computed,
  configure
} from 'mobx';
import Firebase from '../components/Firebase/firebase';

class Store {
  constructor() {
    this.user = '';
    this.email = '';
    this.password = '';
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    Firebase.auth().onAuthStateChanged(user => {
      console.log('user:', user);
      if (user) {
        this.user;
      } else {
        this.user = null;
      }
    });
  }

  login(e) {
    e.preventDefault();
    Firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(result => {
        const user = result.user;
        console.log('user:', user);
      })
      .catch(error => {
        console.log(error);
      });
    console.log('user:', this.user);
    console.log('email:', this.email);
    console.log('password:', this.password);
  }

  signup(e) {
    e.preventDefault();
    Firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(u => {console.log(u);})
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
