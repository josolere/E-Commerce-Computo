import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

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
import { AUTH_TOKEN } from './components/login/constants'

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

const StripePromise = loadStripe('pk_test_51IfpazHObBDKzBSGun3Clgf3wbyo1QMxk6jwHwDwLPoxZTrfGCASzt1R8yDvUMTPqL8dmE4CIUgP8Qr0BqqwAFPq00RZ1Ulyai')

ReactDOM.render(
  <Elements stripe={StripePromise} >
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </Elements>,
  document.getElementById('root')
);



function rootReducer(rootReducer: any) {
  throw new Error('Function not implemented.');
}

