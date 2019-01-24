/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {Route, NavLink, Switch} from 'react-router-dom';
import {observer} from 'mobx-react';
import VideoPlayer from '../components/VideoPlayer.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import SignUpForm from './SignUp.jsx';

class App extends Component {
  displayVideoPlayer(store) {
    return <VideoPlayer store={store} />;
  }

  render() {
    const {store} = this.props;
    return (
      <Switch>
        {store.user ? (<Home />) : (<Login store={store}/>)}
        <SignUpForm />
        <Route component={null} />
      </Switch>
    );
  }
}

export default observer(App);
