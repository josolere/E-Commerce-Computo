import React, { useEffect } from 'react'
import Login from './components/login/Login'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Details from './components/Details/ProductsDetails'
import LandPage from './components/landpage/LandPage'
import Payment from './components/payment/Stripe'
import Home from './components/Home/Home'
import PageNotFound from './components/PageNotFound/PageNotFound'
import ShoppingCart from './components/ShoppingCart/ShoppingCart'
import NavCategories from './components/categories/Categories';
import Cards from './components/Cards/CardsHome';
import styles from './App.module.scss';
import Unicrear from './components/Create/Create'
import Orders from './components/Order/Orders'
import {addLocalStorage} from './redux/actions/index'
import { useDispatch } from 'react-redux'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('productsLocal')) {
      let productLocal: any = (localStorage.getItem('productsLocal'))
      let quantity: any = (localStorage.getItem('quantity'))
      let priceSubTotal: any = (localStorage.getItem('priceSubTotal'))

      productLocal = JSON.parse(productLocal)
      dispatch(addLocalStorage({productLocal, quantity, priceSubTotal}))
    }
  }, [])

  
  return (
    <Router>
      <Route path="/">
          <Home />
      </Route>
      <Switch>
        <Route exact path='/Crear'component={Unicrear} />
        <Route exact path='/Detalles' component={Details} />
        <Route exact path='/Login' component={Login} />
        <Route exact path='/Pago' component={Payment} />
        <Route exact path='/Ordenes' component={Orders}/>
        <Route exact path='/Home'>
          <div className={styles.catalog}>
          <NavCategories/>
          <Cards/>
          </div> 
        </Route>
        <Route exact path='/Carrodecompras' component={ShoppingCart}/>
        <Route exact path='/' component={LandPage} />
        <Route component={PageNotFound}/>
      </Switch>
    </Router>
  );
}

export default App;
