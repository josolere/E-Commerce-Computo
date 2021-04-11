import React, { Fragment } from 'react';
import Login from './components/login/Login'
import { Route } from 'react-router-dom'
import Details from './components/Details/ProductsDetails'
import StarRating from './components/rating/Rating'
import LandPage from './components/landpage/LandPage'
import TestProducts from './components/testserver/test'
import Payment from './components/payment/Payment'
import CreateProduct from './components/CreateProduct/CreateProduct';
import CreateCategory from './components/CreateCategory/CreateCategory';

function App() {
  return (
    <Fragment>
      <Route exact path= '/createC' component={CreateCategory} />
      <Route exact path= '/createP' component={CreateProduct} />
      <Route exact path= '/Details' component={Details} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/Rating' component={StarRating} />
      <Route exact path='/' component={LandPage} />
      <Route exact path='/Test' component={TestProducts} /> 
      <Route exact path= '/Payment' component={Payment} />
    </Fragment>
  );
}

export default App;
