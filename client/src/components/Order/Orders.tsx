import ordersStyle from './Orders.module.scss'
import {Link} from 'react-router-dom'

interface props {
    id: number
    status: string
    fecha:number
    // quantity:number
}

const Orders = ({ id, status,  fecha }: props) => {
    return (
        <>
            <div className={ordersStyle.bodyOrders}>
                <h1>TusOrdenes</h1>
                <div className={ordersStyle.contenedorCard}>
                    <div className={ordersStyle.contenedorHeaderCard}>
                        <div className={ordersStyle.numberOrder}>
                            <h4>Numero De Orden:</h4>
                            <p>{id}</p>
                        </div>
                        <div className={ordersStyle.date}>
                            <h4>Fecha Orden:</h4>
                            <p>{fecha}</p>
                        </div>
                        <div className={ordersStyle.date}>
                            <h4>Estado: </h4>
                            <p>{status}</p>
                        </div>
                        <div className={ordersStyle.date}>
                            <h4>Cantidad de Productos:</h4>
                            <p>21</p>
                        </div>
                        <div  className={ordersStyle.containerLink}>
                            <Link className={ordersStyle.link} to='/detalleordenes'>
                                Detalles
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Orders
