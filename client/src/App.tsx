import React, { Fragment } from 'react';
import Login from './components/login/Login'
import './App.css';
import { Route } from 'react-router-dom'
import Details from './components/Details/ProductsDetails'
import StarRating from './components/rating/Rating'
import LandPage from './components/landpage/LandPage'
import TestProducts from './components/testserver/test'

function App() {
  return (
    <Fragment>
      <Route exact path= '/Details' component={Details} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/Rating' component={StarRating} />
      <Route exact path='/' component={LandPage} />
      <Route exact path='/Test' component={TestProducts} /> 
    </Fragment>
  );
}

export default App;
