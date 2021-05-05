import React, { useEffect, useState } from 'react'
import styles from './OrderUserDetail.module.scss'
import { GET_ORDER_DETAILS, EDIT_ORDER } from '../../../gql/ordersGql'
import { useMutation, useQuery } from '@apollo/client'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import styles2 from './ResponsiveOrder.module.scss';

interface IParams {
    id: string
}

export default function OrderUserDetails() {
    //obtengo id desde la url
    const { id } = useParams<IParams>()
    // const id = props.history.location.state.id
    //traigo la orden x su id
    const { loading, error, data } = useQuery(GET_ORDER_DETAILS, { variables: { id: 1 } })

    const order = data?.getOrderById
    let date: any = ""
    console.log("aaaaa")
    useEffect(() => {
        console.log(order?.confirmAt)
        new Date(order?.confirmAt).toLocaleDateString("en-US")
    }, [order])

    const totalCalc = () => {
        let total = 0
        order?.details?.map((obj: any) => {
            total = total + (obj.price * obj.quantity)
        })
        return total
    }


    return (//creada => procesando => completa || cancelada
        <div className={styles2.back}>
            <div className={styles2.organizar}>
                <div className={styles2.caja}>
                    <div className={styles2.containeTitle}>
                        <h1 className={styles2.titleLitte} >Orden Nro: {order?.id}</h1>
                        <h1 className={styles2.titleLitte} >Fecha de realización: {new Date(+order?.confirmAt).toLocaleDateString("en-GB")}</h1>
                        <h1 className={styles2.titleLitte} >Estado: {order?.status}<FontAwesomeIcon icon={faCircle} style={
                            (order?.status === 'cancelada' && { color: '#FF3434' }) ||
                            (order?.status === 'procesando' && { color: '#FCFF2F' }) ||
                            (order?.status === 'completa' && { color: '#6DFF2F' }) ||
                            { color: '#FF7400' }
                        } /></h1>
                    </div>
                    <div className={styles.products}>
                        <nav>
                            <div className={styles2.styleColumn} >Nombre</div>
                            <div className={styles2.styleColumn} >Cantidad</div>
                            <div className={styles2.styleColumn} >Precio</div>
                            <div className={styles2.styleColumn} >TOTAL</div>
                        </nav>
                        {order?.details?.map((obj: any) => <nav key={obj.id}>
                            <div className={styles2.styleColumn}>
                                <Link
                                    
                                    className={styles2.styleColumn2} style={{ textDecoration: 'none' }} to={{
                                        pathname: '/Detalles',
                                        state: {
                                            id: obj.id,
                                            newprice: 0
                                        }
                                    }}>
                                    {obj.productName}
                                </Link>
                            </div>
                            <div className={styles2.styleColumn} >{obj.quantity}</div>
                            <div className={styles2.styleColumn} >{obj.price}</div>
                            <div className={styles2.styleColumn} >${obj.price * obj.quantity}</div>
                        </nav>)}
                        <nav>
                            <div className={styles2.styleColumn} >***</div>
                            <div className={styles2.styleColumn} >***</div>
                            <div className={styles2.styleColumn} >***</div>
                            <div className={styles2.styleColumn} >${totalCalc()}</div>
                        </nav>
                    </div>
                </div>
            </div>

        </div>
    )
}

