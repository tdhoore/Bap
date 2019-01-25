/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {Route, NavLink, Switch, withRouter} from 'react-router-dom';
import {observer} from 'mobx-react';
import VideoPlayer from '../components/VideoPlayer.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Home from './Home.jsx';
import firebase from 'firebase/app';

class App extends Component {
  constructor() {
    super();
    this.authenticated = false;
    this.currentUser = null;
    this.loading = true;
  }

  displayVideoPlayer(store) {
    return <VideoPlayer store={store} />;
  }

  componentDidMount() {
    this.firebaseListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authenticated = true;
        this.currentUser = user;
        this.loading = false;
      } else {
        this.authenticated = false;
        this.currentUser = null;
        this.loading = false;
      }
    });
  }

  componentWillUnmount() {
    this.firebaseListener = undefined;
  }
  

  render() {
    const {store} = this.props;
    return (
      <Switch>
        <Route path='/' exact render={() => <Home store={store}/>} authenticated={this.authenticated} />
        <Route path='/login' render={() => <Login store={store} history={history}/>} authenticated={this.authenticated} />
        <Route path='/register' render={() => <Register store={store}/>} authenticated={this.authenticated} />
      </Switch>
    );
  }
  
}

export default withRouter(observer(App));
