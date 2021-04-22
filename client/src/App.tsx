import Login from './components/login/Login'
import { useEffect } from "react"
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
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
import Orders from './components/Order/Orders'
import { addLocalStorage } from './redux/actions/index'
import { useDispatch } from 'react-redux';
import EditAccount from './components/login/EditAccount';
import { ToastContainer } from 'react-toastify'

function App() {

  const dispatch = useDispatch()

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
        <Route exact path='/CrearProducto'component={CrearProducto} />
        <Route exact path='/CrearCategoria'component={CrearCategoria} />
        <Route exact path='/Perfil'component={EditAccount} />
        <Route exact path='/Detalles' component={Details} />
        <Route exact path='/Login' component={Login} />
        <Route exact path='/Pago' component={Payment} />
        <Route exact path='/Ordenes' component={Orders} />
        <Route exact path='/Home'>
          <div className={styles.catalog}>
          <NavCategories/>
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