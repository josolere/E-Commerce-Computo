import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//import { Provider } from 'react-redux'
//import { createStore } from 'redux'
//import rootReducer from './redux/reducers'
//const store = createStore(rootReducer)

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter } from 'react-router-dom'
import {AUTH_TOKEN} from './components/login/constants'

import { Provider } from 'react-redux';
import store from './redux/store';

/* const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
}); */

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:5000/graphql',
  }),
})

ReactDOM.render(
  <Provider store={store}>
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);



function rootReducer(rootReducer: any) {
  throw new Error('Function not implemented.');
}

