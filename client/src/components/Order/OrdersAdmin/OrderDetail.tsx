import React, { useEffect, useState } from 'react'
import styles from './OrderDetail.module.scss'
import { GET_ORDER_DETAILS, EDIT_ORDER } from '../../../gql/ordersGql'
import { useMutation, useQuery } from '@apollo/client'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import stylesR from './ResponsiveOrder.module.scss';

interface IParams {
    id: string
}
interface PropsDetails {
    history: {
        location: {
            state: {
                id: number
                newprice: number
            }
        }
    }
}


export default function OrderDetails(props: PropsDetails) {
    //obtengo id desde la url
    const { id } = useParams<IParams>()
    // const id = props.history.location.state.id
    //traigo la orden x su id
    console.log(id)
    const { loading, error, data } = useQuery(GET_ORDER_DETAILS, { variables: { id: +id } })
    const order = data?.getOrderById

    const [editOrderStatus, editResults] = useMutation(EDIT_ORDER, {
        refetchQueries: [{ query: GET_ORDER_DETAILS, variables: { id: +id } }]
    })


    const handleStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(e.currentTarget.value)
        editOrderStatus({ variables: { id: order?.id, status: e.currentTarget.value } })
    }

    useEffect(() => {
        console.log(data)
        console.log(loading)
        console.log(error)
    }, [data])

    const totalCalc = () => {
        let total = 0
        order?.details?.map((obj: any) => {
            total = total + (obj.price * obj.quantity)
        })
        return total
    }


    return (//creada => procesando => completa || cancelada
        <div className={stylesR.back}>
            <div className={stylesR.organizar}>
                <div className={stylesR.caja}>
                    <div className={stylesR.containeTitle}>
                    <Link to='/Ordenes'>
                            <button className={stylesR.CombeBackButton} >Volver atrás</button>
                        </Link>
                        <h1 className={stylesR.titleLitte} >Orden Nro: {order?.id} </h1>
                        <h1 className={stylesR.titleLitte} >Fecha de realización: {new Date(+order?.confirmAt).toLocaleDateString("en-GB")}</h1>
                        <h1 className={stylesR.titleLitte} > Estado: {order?.status}<FontAwesomeIcon icon={faCircle} style={
                            (order?.status === 'cancelada' && { color: '#FF3434' }) ||
                            (order?.status === 'procesando' && { color: '#FCFF2F' }) ||
                            (order?.status === 'completa' && { color: '#6DFF2F' }) ||
                            { color: '#FF7400' }
                        } /> </h1>
                        {order?.status === "creada" && <> 
                        <button className={stylesR.ButtonsUglys} onClick={handleStatus} style={{ backgroundColor: '#FCFF2F' }} value='procesando'>Procesando</button>
                         <button className={stylesR.ButtonsUglys} onClick={handleStatus} style={{ backgroundColor: '#FF3434' }} value='cancelada'>Cancelar</button> </>}
                        {order?.status === "procesando" && <>
                        <button className={stylesR.ButtonsUglys} onClick={handleStatus} style={{ backgroundColor: '#6DFF2F' }} value='completa'>Completo</button>
                        <button className={stylesR.ButtonsUglys} onClick={handleStatus} style={{ backgroundColor: '#FF3434' }} value='cancelada'>Cancelar</button> </>}
                    </div>
                    <div className={styles.container}>
                        <div className={styles.products}>
                            <nav>
                                <div className={stylesR.styleColumn} >Nombre</div>
                                <div className={stylesR.styleColumn} >Cantidad</div>
                                <div className={stylesR.styleColumn} >Precio</div>
                                <div className={stylesR.styleColumn}>TOTAL</div>
                            </nav>
                            {order?.details?.map((obj: any) => <nav key={obj.id} >
                                <div>
                                    <Link
                                        className={stylesR.styleColumn2} style={{ textDecoration: 'none' }} to={{
                                            pathname: '/Detalles',
                                            state: {
                                                id: obj.id,
                                                newprice: 0
                                            }
                                        }}>
                                        {obj.productName}
                                    </Link>
                                </div>
                                <div className={stylesR.styleColumn} >{obj.quantity}</div>
                                <div className={stylesR.styleColumn} >${obj.price}</div>
                                <div className={stylesR.styleColumn} >${obj.price * obj.quantity}</div>
                            </nav>)}
                            <nav>
                                <div className={stylesR.styleColumn} >TOTAL</div>
                                <div className={stylesR.styleColumn} >***</div>
                                <div className={stylesR.styleColumn} >***</div>
                                <div className={stylesR.styleColumn}  >${totalCalc()}</div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}






//traigo los detalles del producto con el id que viene en la Orden
// const resul = useQuery(GET,{variables:{id:data?.getOrderById?.details[0].ProductId}})
// const results = resul?.data?.getProductById


// useEffect(()=>{
//     console.log(results)
// },[data,results])