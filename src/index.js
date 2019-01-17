import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import App from './containers/App';

//import ApolloClient from 'apollo-boost';
//import {ApolloProvider} from 'react-apollo';

import store from './store';

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
