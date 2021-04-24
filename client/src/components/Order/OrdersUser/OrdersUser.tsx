import React, { useEffect, useState } from 'react'
import styles from './OrdersUser.module.scss'
import {GET_ALL_ORDERS, GET_ORDERS_USER} from '../../../gql/orders'
import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faPlus } from '@fortawesome/free-solid-svg-icons'

interface IOrder {
    id:number
    status:string
    details:[any]
    __typename:"Order"
}

const GET_CURRENT_USER = gql`
query{
    currentUser{
      id
      email
      
    }
  }
`

export default function OrdersUser() {
    const [idUser, setIdUser] = useState("")

    const results = useQuery(GET_CURRENT_USER)
    const user = results?.data?.currentUser
    console.log(user?.id)
    const {loading, error, data} = useQuery(GET_ORDERS_USER ,{variables:{idUser:user?.id}})//aca iria user.id
    console.log(results.data)
    console.log(data)
    const orders = data?.getOrdersByIdUser

    return (
        <div className={styles.container}>
            <h1>Todas las órdenes</h1>
            <div className={styles.products}>
            <nav>
                <div>Nro de Orden</div>
                <div>Estado</div>
                <a></a>
            </nav>
                {!loading && orders?.map((order:IOrder) => <nav key={order.id}>
                    <div >{order.id}</div>
                    <FontAwesomeIcon icon={faCircle} style={
                    (order.status === 'cancelada' && {color:'#FF3434'})||
                    (order.status === 'procesando' && {color:'#FCFF2F'})||
                    (order.status === 'completa' && {color:'#6DFF2F'})||
                    {color:'#FF7400'}
                    }/>
                    <div>{order.status}</div>
                    <a href={'/Orden/Usuario/'+order.id}>
                        Ver más
                        <FontAwesomeIcon icon={faPlus}/>
                    </a>
                </nav>)}
            </div>
        </div>
    )
}