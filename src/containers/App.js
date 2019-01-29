/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {Route, NavLink, Switch, withRouter, Redirect} from 'react-router-dom';
import {observer} from 'mobx-react';
import VideoPlayer from '../components/VideoPlayer.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Home from './Home.jsx';
import firebase from 'firebase/app';

class App extends Component {
  displayVideoPlayer(store) {
    return <VideoPlayer store={store} />;
  }

  render() {
    const {store} = this.props;
    return (
      <Switch>
        <Route path='/' 
        exact 
        render={(props) => <Home store={store}/>} 
        />
        <Route 
        path='/login' 
        render={(props) => {
          console.log(`authenticated:`, store);
          if(store.user){
            return <Redirect to='/'/>
          }
          return <Login store={store}/>
        }} 
        />
        <Route 
        path='/register' 
        render={({history}) => <Register store={store} history={history}/>}
        />
      </Switch>
    );
  }
  
}

export default withRouter(observer(App));
