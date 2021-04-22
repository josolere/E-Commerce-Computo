import React, { useEffect, useState } from 'react'
import styles from './OrderDetail.module.scss'
import { GET_ORDER_DETAILS, EDIT_ORDER } from '../../../gql/orders'
import { useMutation, useQuery } from '@apollo/client'
import { useParams } from 'react-router'

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


export default function OrderDetails(props:PropsDetails) {
    //obtengo id desde la url
    const { id } = useParams<IParams>()
    // const id = props.history.location.state.id
    //traigo la orden x su id
    const { loading, error, data } = useQuery(GET_ORDER_DETAILS, { variables: { id:+id } })
    const order = data?.getOrderById

    const [editOrderStatus, editResults] = useMutation(EDIT_ORDER)


    const handleStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(e.currentTarget.value)
        editOrderStatus({ variables: { id: order?.id, status: e.currentTarget.value } })
    }

    // useEffect(() => {
    //     setIdSearch(id)
    // }, [id])

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
            <h4>Estado: {order?.status}</h4>
            {/* {order?.status === "pending" && <button onClick={handleStatus} value='creado'>Creado</button>} */}
            {order?.status === "pending" && <> <button onClick={handleStatus} value='Procesando'>Procesando</button><button onClick={handleStatus} value='Cancelada'>Cancelar</button> </>}
            {order?.status === "Procesando" && <><button onClick={handleStatus} value='Completa'>Completo</button><button onClick={handleStatus} value='Cancelada'>Cancelar</button> </>}
            {/* {order?.status === "Completa" && <button onClick={handleStatus} value='pending'>pending</button>} */}
            <div className={styles.products}>
                <nav>
                <div>Nombre</div>
                <div>Cantidad</div>
                <div>Precio</div>
                <div>TOTAL</div>
                </nav>
                {order?.details?.map((obj: any) => <nav key={obj.id}>
                    <div>"Nombre"</div>
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






//traigo los detalles del producto con el id que viene en la Orden
// const resul = useQuery(GET,{variables:{id:data?.getOrderById?.details[0].ProductId}})
// const results = resul?.data?.getProductById


// useEffect(()=>{
//     console.log(results)
// },[data,results])