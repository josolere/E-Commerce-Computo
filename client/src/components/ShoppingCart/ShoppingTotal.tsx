import { useState, useEffect } from 'react'
import total from './ShoppingTotal.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../redux/reducers';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { NEW_ORDER } from "../../gql/shopingCart"

const ShoppingTotal = (): JSX.Element => {

const dispatch = useDispatch()

    const idsProducts: number = useSelector((store: AppState) => store.shoppingCartReducer.priceSubTotal)
    const [priceTotal, setPriceTotal] = useState(0)
    const [send, setSend] = useState(500)


    // useEffect(() => {
    //     setPriceTotal(idsProducts + send)
    // }, [idsProducts])

    // const handleOrder = () => {
    //     if (localStorage.getItem('productsLocal')) {
    //         let productLocal: any = []
    //         productLocal = (localStorage.getItem('productsLocal'))
    //         productLocal = (JSON.parse(productLocal))
    //         setOrder(productLocal)
    //         localStorage.clear()
    //         dispatch(deleteCart())
    //         localStorage.setItem('productsLocal', JSON.stringify([]))
    //         createOrder({ variables: { status: 'pending', idUser: 1 } })
    //             .then((resolve) => { console.log(data) })
    //             .catch((err) => { console.log('Salio Mal') })
    //     }
    // }
   
    return (
        <>
            <div className={total.containerOrden}>
                <div className={total.containerTitle}>
                    <h1>Mi Compra</h1>
                </div>
                <div className={total.containerValue}>
                    <div className={total.containerSubTotal}>
                        <h2>SubTotal</h2>
                        <p>${new Intl.NumberFormat().format(idsProducts )}</p>
                    </div>
                    <div className={total.containerSent}>
                        <h2>Gastos De Envio</h2>
                        <p>${send}</p>
                    </div>
                    <div className={total.containerTotal}>
                        <h2>Total</h2>
                        <p>${new Intl.NumberFormat().format(priceTotal)}</p>
                        
                    </div>
                </div>
            </div>
            <div className={total.containerButton}>
                <Link to='/pago' onClick={() => {
                    
                }}
                    className={total.buttonFinal}>Finalizar Compra</Link>
            </div>
        </>
    )
}

export default ShoppingTotal
