import React, { useEffect } from 'react'
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

    const {loading, error, data} = useQuery(GET_ALL_ORDERS)
    const orders = data?.getAllOrders

    useEffect(()=>{
        console.log(data)
    },[data])

    return (
        <div className={styles.container}>
            <h1>Todas las órdenes</h1>
            <form>
            <label >Filtrar por:</label>
            <select>
                <option value=''>Todas</option>
                <option value='pendiente'>Pendiente</option>
                <option value='enProceso'>En Proceso</option>
                <option value='completada'>Completada</option>
                <option value='cancelada'>Cancelada</option>
            </select>
            </form>
            <div className={styles.products}>
                {!loading && orders?.map((order:IOrder) => <nav>
                    <div>{order.id}</div>
                    <div>{order.status}</div>
                    <Link to={`/Ordenes/${order.id}`}>
                        Ver más
                    </Link>
                </nav>)}
            </div>
            
        </div>
    )
}