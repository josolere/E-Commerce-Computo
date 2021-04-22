import React, { useEffect, useState } from 'react'
import styles from './AllOrders.module.scss'
import {GET_ALL_ORDERS} from '../../../gql/orders'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'

interface IOrder {
    id:number
    status:string
    details:[any]
    __typename:"Order"
}

export default function AllOrders() {
    const [status, setStatus] = useState("")

    const {loading, error, data} = useQuery(GET_ALL_ORDERS,{variables:{status:status}})
    const orders = data?.getAllOrders

    useEffect(()=>{
        console.log(data)
    },[data])

    const handleStatus = (e: React.FormEvent<HTMLSelectElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div className={styles.container}>
            <h1>Todas las órdenes</h1>
            <form>
            <label >Filtrar por:</label>
            <select onChange={handleStatus}>
                <option value=''>Todas</option>
                <option value='pending'>Pendiente</option>
                <option value='Procesando'>Procesando</option>
                <option value='Completa'>Completa</option>
                <option value='Cancelada'>Cancelada</option>
            </select>
            </form>
            <div className={styles.products}>
            <nav>
                <div>Nro de Orden</div>
                <div>Estado</div>
                <a></a>
            </nav>
                {!loading && orders?.map((order:IOrder) => <nav key={order.id}>
                    <div >{order.id}</div>
                    <div>{order.status}</div>
                    <a href={'/Orden/Detalle/'+order.id}>
                        Ver más
                    </a>
                </nav>)}
            </div>
            
        </div>
    )
}