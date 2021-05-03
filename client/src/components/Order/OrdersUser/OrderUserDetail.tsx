import React, { useEffect, useState } from 'react'
import styles from './OrderUserDetail.module.scss'
import { GET_ORDER_DETAILS, EDIT_ORDER } from '../../../gql/ordersGql'
import { useMutation, useQuery } from '@apollo/client'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

interface IParams {
    id: string 
}

export default function OrderUserDetails() {
    //obtengo id desde la url
    const { id } = useParams<IParams>()
    // const id = props.history.location.state.id
    //traigo la orden x su id
    const { loading, error, data } = useQuery(GET_ORDER_DETAILS,{ variables: {id:1}})

    const order = data?.getOrderById
    let date: any = ""
    console.log("aaaaa")
    useEffect(() => {
       console.log(order?.confirmAt)
       new Date(order?.confirmAt).toLocaleDateString("en-US")
    }, [order])

    const totalCalc = () =>{
        let total = 0
        order?.details?.map((obj:any)=>{
            total = total + (obj.price * obj.quantity)
        })
        return total
    }

    
    return (//creada => procesando => completa || cancelada
        <div className={styles.container}>
            <h1>Orden Nro: {order?.id}</h1>
            <h5>Fecha de realización: {new Date(+order?.confirmAt).toLocaleDateString("en-GB")}</h5>
            <h4>Estado: {order?.status}<FontAwesomeIcon icon={faCircle} style={
                    (order?.status === 'cancelada' && {color:'#FF3434'})||
                    (order?.status === 'procesando' && {color:'#FCFF2F'})||
                    (order?.status === 'completa' && {color:'#6DFF2F'})||
                    {color:'#FF7400'}
                    }/></h4>
            <div className={styles.products}>
                <nav>
                <div>Nombre</div>
                <div>Cantidad</div>
                <div>Precio</div>
                <div>TOTAL</div>
                </nav>
                {order?.details?.map((obj: any) => <nav key={obj.id}>
                <div>
                    <Link
                className={styles.link} style={{ textDecoration: 'none' }} to={{
                    pathname: '/Detalles',
                    state: {
                        id: obj.id,
                        newprice: 0
                    }
                }}>
                    {obj.productName}
                    </Link>
                    </div>
                    <div>{obj.quantity}</div>
                    <div>{obj.price}</div>
                    <div>${obj.price * obj.quantity}</div>
                    </nav>)}
                <nav>
                    <div>***</div>
                    <div>***</div>
                    <div>***</div>
                    <div>${totalCalc()}</div>
                </nav>
            </div>
        </div>
    )
}

