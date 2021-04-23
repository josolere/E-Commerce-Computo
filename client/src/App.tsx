import React, { useState, useEffect } from 'react';
import Login from './components/Users/Login'
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import Details from './components/Details/ProductsDetails'
import LandPage from './components/landpage/LandPage'
import Payment from './components/payment/Stripe'
import Home from './components/Home/Home'
import PageNotFound from './components/PageNotFound/PageNotFound'
import ShoppingCart from './components/ShoppingCart/ShoppingCart'
import NavCategories from './components/categories/Categories';
import CrearProducto from "./components/CreateProduct/CreateProduct"
import CrearCategoria from "./components/CreateCategory/CreateCategory"
import styles from './App.module.scss';
import Orders from './components/Order/Orders';
import { addLocalStorage } from './redux/actions/index'
import { useDispatch } from 'react-redux';
import EditAccount from './components/Users/EditAccount';
import { Cookies, CookiesProvider, useCookies } from "react-cookie";
import CreateAdmin from './components/Users/CreateAdmin';
import DeleteUser from './components/Users/DeleteUser';
import { ToastContainer } from 'react-toastify'
import { useMutation, useQuery, gql } from '@apollo/client';
import { ACTUAL_USER } from "./gql/login";

  
interface user {
  currentUser: {
      name: string,
      password: string,
      email: string
  }
}

interface datauser {
  actualUser: user[]
}

function App() {

  const actualuser = useQuery<user>(ACTUAL_USER)

  console.log(actualuser.data)

  const dispatch = useDispatch()

  const [gotCookies, setGotCookies] = useState(false)

  const cookie = new Cookies

  useEffect(() => {
    if (cookie.get('User')) {
      setGotCookies(true)
    }
  }, [cookie])

  console.log(gotCookies)

  useEffect(() => {
    if (localStorage.getItem('productsLocal')) {
      let productLocal: any = (localStorage.getItem('productsLocal'))
      let quantity: any = (localStorage.getItem('quantity'))
      let priceSubTotal: any = (localStorage.getItem('priceSubTotal'))
      productLocal = JSON.parse(productLocal)
      dispatch(addLocalStorage({ productLocal, quantity, priceSubTotal }))
    } else {
      localStorage.setItem('productsLocal', JSON.stringify([]))
    }
  }, [])


  return (
    <Router>
      
       <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnHover
              pauseOnFocusLoss
              draggable
            />
      <Route path="/">
        <Home />
      </Route>
      <Switch>
        <Route exact path='/CrearProducto'>
          {gotCookies ? <Route exact path='/CrearProducto' component={CrearProducto} /> : <Redirect to={{ pathname: '/login', }} />}
        </Route>
        <Route exact path='/CrearCategoria'>
          {gotCookies ? <Route exact path='/CrearCategoria' component={CrearCategoria} /> : <Redirect to={{ pathname: '/login', }} />}
        </Route>
        <Route exact path='Pago'>
          {gotCookies ? <Route exact path='/Pago' component={Payment} /> : <Redirect to={{ pathname: '/login', }} />}
        </Route>
       {/*  <Route exact path='/BorrarUsuario' component={DeleteUser } /> */}
        <Route exact path='/CrearAdministrador' component={CreateAdmin} />
        <Route exact path='/EditarCuenta' component={EditAccount} />
        <Route exact path='/Detalles' component={Details} />
        <Route exact path='/Login' component={Login} />
        <Route exact path='/Ordenes' component={Orders} />
        <Route exact path='/Home'>
          <div className={styles.catalog}>
            <NavCategories />
          </div>
        </Route>
        <Route exact path='/Carrodecompras' component={ShoppingCart} />
        <Route exact path='/' component={LandPage} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;