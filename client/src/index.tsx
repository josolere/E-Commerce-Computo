import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
<<<<<<< HEAD
<<<<<<< HEAD

//import { Provider } from 'react-redux'
//import { createStore } from 'redux'
//import rootReducer from './redux/reducers'
//const store = createStore(rootReducer)
=======
import { CookiesProvider } from "react-cookie";
import "react-toastify/dist/ReactToastify.css"

>>>>>>> front_roto
=======
import { CookiesProvider } from "react-cookie";
import "react-toastify/dist/ReactToastify.css"

>>>>>>> LogFront

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store';



const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:5000/graphql',
<<<<<<< HEAD
<<<<<<< HEAD
=======
    credentials: 'include',
>>>>>>> front_roto
=======
    credentials: 'include',
>>>>>>> LogFront
  }),
})

const StripePromise = loadStripe('pk_test_51IfpazHObBDKzBSGun3Clgf3wbyo1QMxk6jwHwDwLPoxZTrfGCASzt1R8yDvUMTPqL8dmE4CIUgP8Qr0BqqwAFPq00RZ1Ulyai')

ReactDOM.render(
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> LogFront
  <CookiesProvider>
    <Elements stripe={StripePromise} >
      <Provider store={store}>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ApolloProvider>
      </Provider>
    </Elements>
  </CookiesProvider>,
  document.getElementById('root')
);

<<<<<<< HEAD
>>>>>>> front_roto
=======
>>>>>>> LogFront


function rootReducer(rootReducer: any) {
  throw new Error('Function not implemented.');
}