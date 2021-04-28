import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import SearchBar from "../SearchBar/SearchBar";
import navBar from './NavBar.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AppState } from '../../redux/reducers';
import { setFilter } from '../../redux/actions';
import { Cookies } from "react-cookie";
import NavBarItem from "./NavBarItem";
import { useQuery, useMutation } from '@apollo/client';
import { GET_ORDER_LIST } from "../../gql/order"
import { GET_ORDER_DETAILS, GET_ORDER_BY_StATUS } from '../../gql/orders'
import { addBaseDeDatos } from '../../redux/actions'
import { ACTUAL_USER } from "../../gql/login"


interface user {
  currentUser: {
    name: string,
    password: string,
    email: string
  }
}


interface detailOrderid {
  getOrdersByIdUser: detailsorder[]

}

interface detailsorder {
  id: number,
  status: string,
  details: detail[]
}

interface detail {
  details: orderdetails[],
  id: number
}

interface orderdetails {
  id: number,
  ProductId: number,
  quantity: number,
  price: number,
  productName: string
}

const NavBar = (): JSX.Element => {
  const dispatch = useDispatch()

  const { logeo, idUsers }: any = useSelector((store: AppState) => store.shoppingCartReducer)


  const idProductOrder = useQuery<detailOrderid>(GET_ORDER_LIST, {
    variables: { idUser: idUsers }
  })

  const dataOrderSatus: any = useQuery<detailOrderid>(GET_ORDER_BY_StATUS, {
    variables: { status: "pendiente", idUser: idUsers }
  })



  useEffect(() => {
    console.log(data)
    if (logeo === true && dataOrderSatus.data) {
      let arrayProducts = []
      if (dataOrderSatus.data?.getOrderByStatus[0]?.details.length !== 0) {
        console.log(dataOrderSatus.data?.getOrderByStatus[0]?.details)
        arrayProducts = dataOrderSatus.data?.getOrderByStatus[0]?.details
      } else {
        console.log(dataOrderSatus.data?.getOrderByStatus)
        arrayProducts = dataOrderSatus.data?.getOrderByStatus
      }
      let productBas: any = []
      let conte = 0
      let priceBase = 0
      console.log(arrayProducts)
      arrayProducts !== undefined &&
        arrayProducts.map((mapeo: any) => {
          productBas.push({ id: mapeo.ProductId, price: mapeo.price, count: mapeo.quantity })
          conte = conte + mapeo.quantity
          priceBase = priceBase + mapeo.price * conte
        })
      dispatch(addBaseDeDatos({ productBas, conte, priceBase }))
      localStorage.setItem('productsLocal', JSON.stringify(productBas))
      localStorage.setItem('quantity', JSON.stringify(conte))
      localStorage.setItem('priceSubTotal', JSON.stringify(priceBase))
    }
  }, [dataOrderSatus.data])

  let user:any = {}

  const {data} = useQuery<user>(ACTUAL_USER)

  user = data?.currentUser

  const quantity: number = useSelector((store: AppState) => store.shoppingCartReducer.quantity)

  const [cookiess, setCookies] = useState<any>()

  const cookie = new Cookies


  useEffect(() => {
    setCookies(cookie.get('User'))
  }, [])

  return (
    <>
      <div className={navBar.container}>
        <Link to='/' > <h1 className={navBar.titleNav} >CH</h1> </Link>
        <SearchBar />

        <Link className={navBar.linkCart} to="/Carrodecompras">
          <FontAwesomeIcon className={navBar.iconCart} icon={faShoppingCart} />
          <p>{quantity}</p>
          {/*  <span>${new Intl.NumberFormat().format(idsProducts)}</span> */}

        </Link>

        <div className={navBar.containerLinks}>

          {true ? <Link onClick={() => { dispatch(setFilter("")) }} to="/Home" className={navBar.linksNav}><p>Productos</p></Link> : false}
          <div>
            {user?.name ? false : <Link className={navBar.linksNav} to="/login"><p>Iniciar Sesion</p></Link>}

          </div>

          <p>{user?.name && <NavBarItem info="Mi Cuenta"></NavBarItem>}</p>

        </div>
      </div>
    </>
  );
};

//Redes en el footer

export default NavBar;
