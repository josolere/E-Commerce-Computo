import React, { useState, useEffect, useRef } from "react";
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
import { GET_ORDER_DETAILS, GET_ORDER_BY_STATUS } from '../../gql/ordersGql'
import { addBaseDeDatos } from '../../redux/actions'
import { ACTUAL_USER } from "../../gql/loginGql"


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
  const firsstRender = useRef(true)

  const { logeo, idUsers }: any = useSelector((store: AppState) => store.shoppingCartReducer)

  const idProductOrder = useQuery<detailOrderid>(GET_ORDER_LIST, {
    variables: { idUser: idUsers }
  })

  const dataOrderSatus: any = useQuery<detailOrderid>(GET_ORDER_BY_STATUS, {
    variables: { status: "pendiente", idUser: idUsers }
  })



  useEffect(() => {
    console.log(data)
    if (firsstRender.current) {
      firsstRender.current = false;
    } else {
      if (logeo === true && dataOrderSatus.data) {
        let arrayProducts = []
        if (dataOrderSatus.data?.getOrderByStatus[0]?.details?.length !== 0) {
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
          arrayProducts?.map((mapeo: any) => {
            productBas.push({ id: mapeo.ProductId, price: mapeo.price, count: mapeo.quantity, name:mapeo.productName })
            conte = conte + mapeo.quantity
            priceBase = priceBase + mapeo.price 
          })
        if (!conte && !priceBase) {
          productBas = []
          conte = 0
          priceBase = 0
          dispatch(addBaseDeDatos({ productBas, conte, priceBase }))

        } else {
          dispatch(addBaseDeDatos({ productBas, conte, priceBase }))

        }
      }
    }
  }, [dataOrderSatus.data?.getOrderByStatus[0]?.details])

  let user: any = {}

  const { data } = useQuery<user>(ACTUAL_USER)

  user = data?.currentUser

  const quantity: number = useSelector((store: AppState) => store.shoppingCartReducer.quantity)

  const [cookiess, setCookies] = useState<any>()

  const cookie = new Cookies


  useEffect(() => {
    setCookies(cookie.get('User'))
  }, [])


  const handleRedirCart = () => {
    window.location.href = "http://localhost:3000/Carrodecompras"
  }

  const handleRedirProducts = () => {
    dispatch(setFilter(""))
    window.location.href = "http://localhost:3000/Home"
  }


  return (

    <div>
    </div>
  );
};

//Redes en el footer

export default NavBar;