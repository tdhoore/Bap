import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import App from './containers/App';

//import ApolloClient from 'apollo-boost';
//import {ApolloProvider} from 'react-apollo';

import store from './store';

import * as firebase from 'firebase';
var config = {
  apiKey: "AIzaSyCL-E4wSU4FrQ_CHzciHl3H5pLEYnD7LPg",
  authDomain: "bap-firebase.firebaseapp.com",
  databaseURL: "https://bap-firebase.firebaseio.com",
  projectId: "bap-firebase",
  storageBucket: "bap-firebase.appspot.com",
  messagingSenderId: "573194971360"
};
firebase.initializeApp(config);

/*const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  clientState: {
    defaults,
    resolvers
  },
  request: async operation => {
    const token = localStorage.getItem("jwt");
    operation.setContext({
      headers: {
        authorization: token
          ? `Bearer ${token}`
          : ""
      }
    });
  }
});*/

ReactDOM.render(
  <BrowserRouter>
    <App store={store} />
  </BrowserRouter>,
  document.getElementById(`root`)
);
