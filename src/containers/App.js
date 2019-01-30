/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Route, NavLink, Switch, withRouter, Redirect } from "react-router-dom";
import { observer } from "mobx-react";
import VideoPlayer from "../components/VideoPlayer.jsx";
import VideoEditor from "./VideoEditor.jsx";
import VideoPlayerInfo from "../components/VideoPlayerInfo.jsx";
import BodySelector from "../components/BodySelector.jsx";
import Branches from "../components/Branches.jsx";
import Filter from "../components/Filter.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Home from "./Home.jsx";
import firebase from "firebase/app";

class App extends Component {
  displayVideoPlayer(store) {
    return <VideoPlayer store={store} />;
  }

  displayVideoPlayerInfo(store) {
    return <VideoPlayerInfo store={store} />;
  }

  displayVideoEditor(store) {
    return <VideoEditor store={store} editorType={1} />;
  }

  displayBodySelector(store) {
    return <BodySelector store={store} />;
  }

  displayBranch(store) {
    return <Branches store={store} />;
  }

  displayFilter(store) {
    return <Filter store={store} />;
  }

  render() {
    const { store } = this.props;

    //get initial comments
    //only for the normal player
    store.getComments();

    return (
      <Switch>
        <Route
          path="/"
          exact
          render={props => this.displayVideoEditor(store)}
        />
        <Route
          path="/login"
          render={props => {
            console.log(`authenticated:`, store);
            if (store.user) {
              return <Redirect to="/" />;
            }
            return <Login store={store} />;
          }}
        />
        <Route
          path="/register"
          render={({ history }) => <Register store={store} history={history} />}
        />
      </Switch>
    );
  }
}

export default withRouter(observer(App));
