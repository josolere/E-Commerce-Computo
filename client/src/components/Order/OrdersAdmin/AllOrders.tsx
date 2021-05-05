import React, { useEffect, useState } from 'react';
import styles from './AllOrders.module.scss'
import { GET_ALL_ORDERS } from '../../../gql/ordersGql';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { faPencilAlt, faCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import stylesR from './ResponsiveOrder.module.scss';

interface IOrder {
    id: number
    status: string
    details: [any]
    __typename: "Order"
}

export default function AllOrders() {
    const [status, setStatus] = useState("")

    const { loading, error, data } = useQuery(GET_ALL_ORDERS, { variables: { status: status } })
    const orders = data?.getAllOrders?.filter((order: any) => order?.status != "pendiente")

    useEffect(() => {
        console.log(data)
    }, [data])

    const handleStatus = (e: React.FormEvent<HTMLSelectElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div className={stylesR.back}>
            <div className={stylesR.organizar}>
                <div className={stylesR.caja}>
                    <div className={stylesR.containeTitle}>
                        <h1 className={stylesR.titleCreate} >Todas las órdenes</h1>
                        <Link to='/home'>
                            <button className={stylesR.CombeBackButton} >Volver a home</button>
                        </Link>
                    </div>
                    <div className={styles.container}>
                        <form>
                            <div className={stylesR.containeSelect}>
                                <label className={stylesR.labelSelect} ><FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: '1%' }} /> Filtrar:</label>
                                <select onChange={handleStatus}>
                                    <option value=''>Todas</option>
                                    <option value='creada'>Creada</option>
                                    <option value='procesando'>Procesando</option>
                                    <option value='completa'>Completa</option>
                                    <option value='cancelada'>Cancelada</option>
                                </select>
                            </div>
                        </form>
                        <div className={styles.products}>
                            <nav>
                                <div>Nro de Orden</div>
                                <div>Estado</div>
                                <a></a>
                            </nav>
                            {!loading && orders?.map((order: IOrder) => <nav key={order.id}
                            //  style={
                            //     (order.status === 'procesando' && {backgroundColor:'#FCFF7F',color:'black'})||
                            //     (order.status === 'completa' && {backgroundColor:'#B2FF7F',color:'black'})||
                            //     {backgroundColor:'#F37E7E',color:'black'}}
                            >
                                <div >{order.id}</div>
                                <FontAwesomeIcon icon={faCircle} style={
                                    (order.status === 'cancelada' && { color: '#FF3434' }) ||
                                    (order.status === 'procesando' && { color: '#FCFF2F' }) ||
                                    (order.status === 'completa' && { color: '#6DFF2F' }) ||
                                    { color: '#FF7400' }
                                } />
                                <div>{order.status}</div>
                                <Link to={`/Orden/Detalle/${order.id}`}>
                                    Ver más
                        <FontAwesomeIcon icon={faPlus} />
                                </Link>
                            </nav>)}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}