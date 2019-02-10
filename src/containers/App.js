/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Route, NavLink, Switch, withRouter, Redirect } from "react-router-dom";
import { observer } from "mobx-react";
import MijnProjecten from "./MijnProjecten.jsx";
import VideoEditor from "./VideoEditor.jsx";
import Registration from "./Registration.jsx";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import ProjectDetail from "./ProjectDetail.jsx";
import PrototypeViewer from "./PrototypeViewer.jsx";

class App extends Component {
  render() {
    const { store } = this.props;
    //get initial comments
    //only for the normal player
    //store.getComments();
    // store.checkUser();

    //setup listener to data base
    store.getAllProjects();

    return (
      <Switch>
        <Route path="/" exact render={props => <Home store={store} />} />
        <Route
          path="/login"
          render={props => {
            if (store.user) {
              return <Redirect to="/" />;
            }
            return <Login store={store} />;
          }}
        />
        <Route
          path="/register"
          render={props => {
            if (store.user) {
              return <Redirect to="/login" />;
            }
            return <Registration store={store} />;
          }}
        />
        <Route
          path="/upload"
          render={props => {
            if (store.user) {
              return <VideoEditor store={store} editorType={0} />;
            }
            return <Redirect to="/login" />;
          }}
        />
        <Route
          path="/mijnprojecten"
          render={props => {
            if (!store.user) {
              return <Redirect to="/" />;
            }
            return <MijnProjecten store={store} />;
          }}
        />
        <Route
          path="/projectdetail/:id"
          render={props => <ProjectDetail store={store} props={props} />}
        />
        <Route
          path="/projectdetail/"
          render={props => <ProjectDetail store={store} props={props} />}
        />
        <Route
          path="/prototype/:id"
          render={props => <PrototypeViewer store={store} props={props} />}
        />
        <Route
          path="/prototype"
          render={props => <PrototypeViewer store={store} props={props} />}
        />
        <Route
          path="/createprototype/:projectId/:fase"
          render={props => (
            <VideoEditor store={store} props={props} editorType={1} />
          )}
        />
      </Switch>
    );
  }
}

export default withRouter(observer(App));
