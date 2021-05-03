import React, { useState, useEffect, useRef } from 'react';
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
import { useDispatch } from 'react-redux'
import OrderDetails from './components/Order/OrdersAdmin/OrderDetail'
import OrdersUser from './components/Order/OrdersUser/OrdersUser'
import OrderUserDetails from './components/Order/OrdersUser/OrderUserDetail'
import Orders from './components/Order/Orders';
import EditAccount from './components/Users/EditAccount';
import { Cookies, CookiesProvider, useCookies } from 'react-cookie';
import CreateAdmin from './components/Users/CreateAdmin';
import DeleteUser from './components/Users/DeleteUser';
import { ToastContainer } from 'react-toastify';
import { useMutation, useQuery, gql } from '@apollo/client';
import { ACTUAL_USER, GET_USERS } from "./gql/loginGql";
import ResetPassword from './components/Users/ResetPassword';
import PostPayment from './components/payment/Shipments';
import Mercado from './components/payment/MercadoV2';
import AdminDelete from './components/Users/AdminDelete';
import PayCompleted from './components/payment/PayCompleted';
import Shipments from './components/payment/Shipments'
import MP from './components/payment/MP';
import ResponsiveNav from './components/NavBar/ResponsiveNav'
import { GET_ORDER } from "./gql/shopingCartGql";
import BuildPcUser from './components/buildPc/buildPcUser';
import BuildPc from './components/buildPc/buildPc';
import BuildPcFilter from './components/buildPc/buildPcFilter'
import FormCheckout from './components/CheckOut/FormCheckout';

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
  console.log(test)
  user = actualuser.data?.currentUser
  console.log(user)

  useEffect(() => {

    if (actualuser.data && idOrder.data) {
      let login = true
      if (actualuser.data.currentUser !== null) {
        let idUsers = actualuser?.data?.currentUser.id
        setIdUser(idUsers)
        dispatch(logeo({ idUsers, login }))

        if (actualuser.data && idOrder.data.getOrdersByIdUser.length > 0) {
          console.log(idOrder.data)
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
        <Route exact path='/EditarCuenta' component={EditAccount} />
        <Route exact path='/Orden/Detalle/:id' component={OrderDetails} />
        <Route exact path='/Ordenes' component={OrdersAdmin} />
        {/*  <Route exact path='/BorrarUsuario' component={DeleteUser } /> */}
        <Route exact path='/Carrodecompras' component={ShoppingCart} />
        <Route exact path='/CrearProducto'>
          {user?.privilege === 'admin' ? <Route exact path='/CrearProducto' component={CrearProducto} /> : <Redirect to={{ pathname: '/login', }} />}
        </Route>
        <Route exact path='/CrearCategoria'>
          {user?.privilege === 'admin' ? <Route exact path='/CrearCategoria' component={CrearCategoria} /> : <Redirect to={{ pathname: '/login', }} />}
        </Route>
        <Route path='/Ordenes/Usuario' component={OrdersUser} />
        <Route path='/Orden/Usuario/:id' component={OrderUserDetails} />
        {/* <Route exact path='Pago'>
          {user?.privilege === 'user' ? <Route exact path='/Pago' component={Payment} /> : <Redirect to={{ pathname: '/login', }} />}
        </Route> */}
              <Route exact path='/Mercado' component={MP} />

        <Route exact path='/TestNav' component={ResponsiveNav} />
        <Route exact path='/Envios' component={Shipments} />
        <Route exact path='/PostPago' component={PayCompleted} />
        <Route exact path='/AdminBorrar' component={AdminDelete} />
        <Route exact path='/BorrarUsuario' component={DeleteUser} />
        <Route exact path='/ResetContraseña' component={ResetPassword} />
        <Route exact path='/Login' component={Login} />
        <Route exact path='/Detalles' component={Details} />
        <Route exact path='/Home'>
          <div className={styles.catalog}>
            <NavCategories />
          </div>
        </Route>
        <Route exact path='/checkout' component={FormCheckout}/>
        <Route exact path='/' component={LandPage} />
        <Route exact path ="/armatupc" component = { BuildPcFilter } />
        <Route exact path ="/armatupc/tipo/:tipo" component = { BuildPc } />
        <Route exact path ="/armatupc/:marca" component = { BuildPcUser } />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;