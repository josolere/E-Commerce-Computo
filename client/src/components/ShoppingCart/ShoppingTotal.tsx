import React from 'react'
import total from './ShoppingTotal.module.css'

const ShoppingTotal = (): JSX.Element => {
    return (
        <>
            <div className={total.containerOrden}>
                <div className={total.containerTitle}>
                    <h1>Mi Compra</h1>
                </div>
                <div className={total.containerValue}>
                    <div className={total.containerSubTotal}>
                        <h2>SubTotal</h2>
                        <p>$1000</p>
                    </div>
                    <div className={total.containerSent}>
                        <h2>Gastos De Envio</h2>
                        <p>$100</p>
                    </div>
                    <div className={total.containerTotal}>
                        <h2>Total</h2>
                        <p>$1100</p>
                    </div>
                </div>
            </div>
            <div className={total.containerButton}>
                <button className={total.buttonFinal}>Finalizar Compra</button>
            </div>
        </>
    )
}

export default ShoppingTotal
