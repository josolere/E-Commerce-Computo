import ordersStyle from './Orders.module.scss'

const Orders = () => {
    return (
        <>
            <div className={ordersStyle.bodyOrders}>
                <h1>TusOrdenes</h1>
                <div className={ordersStyle.contenedorCard}>
                    <div className={ordersStyle.contenedorHeaderCard}>
                        <div className={ordersStyle.numberOrder}>
                            <h2>Numero De Orden:</h2>
                            <p>1111111</p>
                        </div>
                        <div className={ordersStyle.date}>
                            <h2>Fecha Orden:</h2>
                            <p>2121212</p>
                        </div>
                    </div>
                    <div className={ordersStyle.contenedorBodyCard}>
                    </div>
                    <div className={ordersStyle.contenedorFooterCard}>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Orders
