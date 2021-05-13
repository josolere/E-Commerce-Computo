import React, { useState, useEffect, useRef, Component } from 'react';
import Login from './components/Users/Login';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Details from './components/Details/ProductsDetails';
import LandPage from './components/landpage/LandPage';
import Home from './components/Home/Home';
import PageNotFound from './components/PageNotFound/PageNotFound';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import NavCategories from './components/categories/Categories';
import CrearProducto from "./components/CreateProduct/CreateProduct";
import CrearCategoria from "./components/CreateCategory/CreateCategory";
import styles from './App.module.scss';
import OrdersAdmin from './components/Order/OrdersAdmin/OrdersAdmin'
import { addLocalStorage, logeo, orderId } from './redux/actions/index'
import { useDispatch, useSelector } from 'react-redux'
import OrderDetails from './components/Order/OrdersAdmin/OrderDetail'
import OrdersUser from './components/Order/OrdersUser/OrdersUser'
import OrderUserDetails from './components/Order/OrdersUser/OrderUserDetail'
import Orders from './components/Order/Orders';
import { Cookies, CookiesProvider, useCookies } from 'react-cookie';
import CreateAdmin from './components/Users/CreateAdmin';
import DeleteUser from './components/Users/DeleteUser';
import { ToastContainer } from 'react-toastify';
import { useQuery } from '@apollo/client';
import { ACTUAL_USER, GET_USERS } from "./gql/loginGql";
import ResetPassword from './components/Users/ResetPassword';
import AdminDelete from './components/Users/AdminDelete';
import PayCompleted from './components/payment/PayCompleted';
import Shipments from './components/payment/Shipments'
import MP from './components/payment/MP';
import { GET_ORDER } from "./gql/shopingCartGql";
import BuildPcUser from './components/buildPc/buildPcUser';
import BuildPcFilter from './components/buildPc/buildPcFilter'
import FormCheckout from './components/CheckOut/FormCheckout';
import Wishlist from './components/Wishlist/Wishlist';
import Featured from './components/Featured/Featured';
import ResetAdmin from './components/Users/ResetAdminV2';
import OlvideContraseña from './components/Users/OlvideContraseña';
import NuevaContraseña from './components/Users/NuevaContraseña';
import Contact from './components/Contact/Contact'


interface user {
  currentUser: {
    name: string,
    password: string,
    email: string,
    privilege: string
    id: string
  }
}

interface datauser {
  actualUser: user[]
}

interface detailOrderid {
  getOrdersByIdUser: detailsorder[]

}

interface detailsorder {
  id: number,
  status: string
}



function App() {
  const firsstRender = useRef(true)


  let user: any = {}

  const [idUser, setIdUser] = useState('')

  const actualuser = useQuery<user>(ACTUAL_USER)
  const idOrder = useQuery<detailOrderid>(GET_ORDER, ({ variables: { idUser: idUser } }))
  const dispatch = useDispatch()

  const cookie = new Cookies

  const resultsUsers = useQuery(GET_USERS)

  let test = resultsUsers?.data?.getUsers
  user = actualuser.data?.currentUser

  useEffect(() => {

    if (actualuser.data && idOrder.data) {
      let login = true
      if (actualuser.data.currentUser !== null) {
        let idUsers = actualuser?.data?.currentUser.id
        setIdUser(idUsers)
        dispatch(logeo({ idUsers, login }))

        if (actualuser.data && idOrder.data.getOrdersByIdUser.length > 0) {
          let arrayOrders = idOrder?.data?.getOrdersByIdUser
          let newArrayOrders = arrayOrders.filter((filt: any) => filt.status === 'pendiente')
          let idsOrder = newArrayOrders[0]?.id
          dispatch(orderId(idsOrder))
        }
      }
    }

  }, [actualuser, idOrder])

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
        <Route exact path='/CrearAdministrador' component={CreateAdmin} />
        <Route exact path='/Orden/Detalle/:id' component={OrderDetails} />
        <Route exact path='/Ordenes' component={OrdersAdmin} />
        <Route exact path='/Carrodecompras' component={ShoppingCart} />
        <Route exact path='/CrearProducto' component={CrearProducto} />
        <Route exact path='/CrearCategoria' component={CrearCategoria} />
        <Route path='/Ordenes/Usuario' component={OrdersUser} />
        <Route path='/Orden/Usuario/:id' component={OrderUserDetails} />

        <Route exact path='/Envios' component={Shipments} />
        <Route exact path='/PostPago' component={PayCompleted} />
        <Route exact path='/AdminBorrar' component={AdminDelete} />
        <Route exact path='/Mercado' component={MP} />
        <Route exact path='/BorrarUsuario' component={DeleteUser} />
        <Route exact path='/ResetContraseña' component={ResetPassword} />
        <Route exact path='/Login' component={Login} />
        <Route exact path='/Detalles' component={Details} />
        <Route exact path='/Home'>
          <Featured />
          <div className={styles.catalog}>
            <NavCategories />
          </div>
        </Route>
        <Route exact path='/checkout' component={FormCheckout} />
        <Route exact path='/ResetPassAdmin' component={ResetAdmin} />
        <Route exact path='/wishlist' component={Wishlist} />
        <Route exact path='/'  >
          <Redirect to={{ pathname: '/Home', }} />
        </Route>
        {/* <Route exact path="/armatupc" component={BuildPcFilter} /> */}
        {/* <Route exact path="/armatupc/tipo/:tipo" component={BuildPcUser} /> */}
        <Route exact path="/armatupc" component={BuildPcUser} />
        <Route exact path="/recuperarcontrasena" component={OlvideContraseña} />
        <Route exact path="/NuevaContrasena" component={ResetPassword} />
        <Route component={PageNotFound} />
      </Switch>
      <Route path="/">
        <Contact/>
      </Route>
    </Router>
  );
}

export default App;