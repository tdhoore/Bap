/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {Route, NavLink, Switch} from 'react-router-dom';
import {observer} from 'mobx-react';
import VideoPlayer from '../components/VideoPlayer.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';

//import GET_CURRENT_USER from "../graphql/getCurrentUser";
//import { Query } from "react-apollo";

class App extends Component {
  /*diplayAppSelf(store) {
    return (
      <div className="App">
        <div className="gameListHolder">
          <Filter />
          <RandomGameList store={store} steamId={0} />
        </div>
        <PlayList store={store} />
      </div>
    );
  }

  displayLogin(store, client) {
    return <Login store={store} client={client} />;
  }

  isUserLogedIn(store) {
    return (
      <Query query={GET_CURRENT_USER}>
        {({ loading, error, data, client }) => {
          if (loading) return null;
          if (error) return null;
          return data.currentUser
            ? this.diplayAppSelf(store)
            : this.displayLogin(store, client);
        }}
      </Query>
    );
  }*/

  displayVideoPlayer(store) {
    return <VideoPlayer store={store} />;
  }

  render() {
    const {store} = this.props;
    return (
      <Switch>
        {store.user ? (<Home />) : (<Login store={store}/>)}
        <Route component={null} />
      </Switch>
    );
  }
}

export default observer(App);
