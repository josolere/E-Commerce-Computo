import Login from './components/login/Login'
import { useEffect } from "react"
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Details from './components/Details/ProductsDetails'
import LandPage from './components/landpage/LandPage'
import Payment from './components/payment/Stripe'
import CreateProduct from './components/CreateProduct/CreateProduct';
import CreateCategory from './components/CreateCategory/CreateCategory';
import Home from './components/Home/Home'
import PageNotFound from './components/PageNotFound/PageNotFound'
import ShoppingCart from './components/ShoppingCart/ShoppingCart'
import NavCategories from './components/categories/Categories';
import Cards from './components/Cards/CardsHome';
import styles from './App.module.scss';
import Unicrear from './components/Create/Create'
import OrdersAdmin from './components/Order/OrdersAdmin/OrdersAdmin'
import { addLocalStorage } from './redux/actions/index'
import { useDispatch } from 'react-redux'
import OrderDetails from './components/Order/OrdersAdmin/OrderDetail'

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
      <Route path="/">
        <Home />
      </Route>
      <Switch>
        <Route exact path='/Crear' component={Unicrear} />
        {/*       <Route exact path='/CrearCategoria' component={CreateCategory} />
        <Route exact path='/CrearProducto' component={CreateProduct} /> */}
        <Route exact path='/Detalles' component={Details} />
        <Route exact path='/Login' component={Login} />
        <Route exact path='/Pago' component={Payment} />
        <Route exact path='/Ordenes/:id' component={OrderDetails} />
        <Route exact path='/Ordenes' component={OrdersAdmin} />
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
