import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CookiesProvider } from "react-cookie";
import "react-toastify/dist/ReactToastify.css";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://compuhenry.hopto.org:5000/graphql',
    credentials: 'include',
  }),
})

/* const StripePromise = loadStripe('pk_test_51IfpazHObBDKzBSGun3Clgf3wbyo1QMxk6jwHwDwLPoxZTrfGCASzt1R8yDvUMTPqL8dmE4CIUgP8Qr0BqqwAFPq00RZ1Ulyai') */

ReactDOM.render(
  <CookiesProvider>
   {/*  <Elements stripe={StripePromise} > */}
      <Provider store={store}>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ApolloProvider>
      </Provider>
    {/* </Elements> */}
  </CookiesProvider>,
  document.getElementById('root')
);



function rootReducer(rootReducer: any) {
  throw new Error('Function not implemented.');
}