import React, { useEffect, useState } from 'react'
import styles from './ResponsiveOrder.module.scss';
import { GET_ALL_ORDERS, GET_ORDERS_USER } from '../../../gql/ordersGql'
import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareLeft, faCaretSquareRight, faCircle, faList, faPlus } from '@fortawesome/free-solid-svg-icons'
import SadBag from '../../images/EmptyBag.png';

interface IOrder {
    id: number
    status: string
    details: [any]
    __typename: "Order"
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
    const { loading, error, data } = useQuery(GET_ORDERS_USER, { variables: { idUser: user?.id } })//aca iria user.id
    console.log(results.data)
    console.log(data)
    const orders = data?.getOrdersByIdUser.filter((order: any) => order?.status != "pendiente")

    return (
        <div className={styles.back}>
            <div className={styles.organizar}>
                <div className={styles.caja}>
                    <div className={styles.containeTitle}>
                        <h1 className={styles.titleCreate} >Todas sus órdenes</h1>
                        <Link to='/home'>
                            <button className={styles.ComeHomeButton} >Volver a home</button>
                        </Link>
                    </div>
                    {orders && orders.length === 0 ?
                        <div className={styles.sortSad} >
                            <h1 className={styles.titleCreate}   >Sus pedidos están vacios</h1>
                            <p className={styles.pSad} >¡Empieza a descubrir productos increibles!</p>
                            <img className={styles.ImageHeart} src={SadBag} alt='' />
                        </div>
                        :
                        <div className={styles.sortDisaster} >
                            {!loading && orders?.sort((a:any, b:any)=> b.id - a.id).map((order: IOrder) =>
                                <div className={styles.sortRow}
                                    key={order.id}>
                                    <p className={styles.OrderNum} >
                                        <FontAwesomeIcon icon={faList} style={{ marginRight: '5%' }} />Orden:{order.id}</p>
                                    <p className={styles.OrderNum} >
                                        Estado:<FontAwesomeIcon icon={faCircle} className={styles.SeparateIcon} style={
                                            (order.status === 'cancelada' && { color: '#FF3434' }) ||
                                            (order.status === 'procesando' && { color: '#FCFF2F' }) ||
                                            (order.status === 'completa' && { color: '#6DFF2F' }) ||
                                            { color: '#FF7400' }
                                        } />{order.status}</p>
                                    <a
                                        className={styles.OrderPlus}
                                        href={'/Orden/Usuario/' + order.id}>
                                        <FontAwesomeIcon icon={faPlus} style={{ marginRight: '10%' }} />Ver
                                    </a>
                                </div>)}
                        </div>}
                </div>
            </div>
        </div>
    )
}