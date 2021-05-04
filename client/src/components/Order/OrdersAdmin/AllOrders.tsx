import React, { useEffect, useState } from 'react'
import styles from './AllOrders.module.scss'
import { GET_ALL_ORDERS } from '../../../gql/ordersGql'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { faEnvelopeSquare, faUnlock, faFileSignature, faMapMarker, faShareAlt, faSearch, faCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IOrder {
    id:number
    status:string
    details:[any]
    __typename:"Order"
}

export default function AllOrders() {
    const [status, setStatus] = useState("")

    const {loading, error, data} = useQuery(GET_ALL_ORDERS,{variables:{status:status}})
    const orders = data?.getAllOrders?.filter((order:any) =>  order?.status != "pendiente")

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
                <option value='creada'>Creada</option>
                <option value='procesando'>Procesando</option>
                <option value='completa'>Completa</option>
                <option value='cancelada'>Cancelada</option>
            </select>
            </form>
            <div className={styles.products}>
            <nav style={{backgroundColor:'#30475e', color:'whitesmoke'}}>
                <div>Nro de Orden</div>
                <div>Estado</div>
                <a></a>
            </nav>
                {!loading && orders?.map((order:IOrder) => <nav key={order.id}
                >
                    <div >{order.id}</div>
                    <FontAwesomeIcon icon={faCircle} style={
                    (order.status === 'cancelada' && {color:'#FF3434'})||
                    (order.status === 'procesando' && {color:'#FCFF2F'})||
                    (order.status === 'completa' && {color:'#6DFF2F'})||
                    {color:'#FF7400'}
                    }/>
                    <div>{order.status}</div>
                    <Link to={`/Orden/Detalle/${order.id}`}>
                        Ver más
                        <FontAwesomeIcon icon={faPlus}/>
                    </Link>
                </nav>)}
            </div>
        </div>
    )
}