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
  calcAmountForSlider(store) {
    //add event listener to window
    window.addEventListener("resize", e => this.handleResizeWindow(store));
  }

  handleResizeWindow(store) {
    const windowWidth = window.innerWidth;

    if (windowWidth >= 768 && windowWidth < 992) {
      //is tablet
      store.sliderAmount = 2;
    } else if (windowWidth >= 992) {
      //is desktop
      store.sliderAmount = 3;
    } else {
      //is mobile
      store.sliderAmount = 1;
    }
  }

  componentDidMount() {
    const { store } = this.props;

    //set initial size
    this.handleResizeWindow(store);
  }

  render() {
    const { store } = this.props;
    //setup listener to data base
    store.getAllProjects();

    //add event listener
    this.calcAmountForSlider(store);

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
          path="/prototype/:id"
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
