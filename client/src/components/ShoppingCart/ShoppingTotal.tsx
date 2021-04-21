import { useState, useEffect } from 'react'
import total from './ShoppingTotal.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../redux/reducers';
import { deleteCart } from '../../redux/actions'
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { NEW_ORDER } from "../../gql/shopingCart"
import { Cookies, CookiesProvider, useCookies } from "react-cookie";
import Alert from '../Alerts/AlertsBuy';


const ShoppingTotal = (): JSX.Element => {

    const [createOrder, { data }] = useMutation(NEW_ORDER)
    const dispatch = useDispatch()
    const idsProducts: number = useSelector((store: AppState) => store.shoppingCartReducer.priceSubTotal)
    const [priceTotal, setPriceTotal] = useState(0)
    const [send, setSend] = useState(500)
    const [order, setOrder] = useState([])
    const [gotcookie, setGotcookie] = useState(false)
    const [hideAlert, setHideAlert] = useState(false)
    const cookie = new Cookies

    useEffect(() => {
        cookie.get('User') ? setGotcookie(true) : setGotcookie(false);
    }, [cookie])

    useEffect(() => {
        setPriceTotal(idsProducts + send)
    }, [idsProducts])

    const handleOrder = () => {
        if (localStorage.getItem('productsLocal') && gotcookie === true) {
            let productLocal: any = []
            productLocal = (localStorage.getItem('productsLocal'))
            productLocal = (JSON.parse(productLocal))
            setOrder(productLocal)
            localStorage.clear()
            dispatch(deleteCart())
            console.log(productLocal)
            console.log(order)
            createOrder({ variables: { status: 'pending', idUser: 1 } })
                .then((resolve) => { console.log(data) })
                .catch((err) => { console.log('Salio Mal') })
            window.location.href = 'http://localhost:3000/Pago'
        }
        else {
            setHideAlert(true)
        }
    }

    console.log(order)

    return (
        <>
            <div className={total.containerOrden}>
            {hideAlert ?
                <div className={total.alert}>
                    <Alert />
                </div> : false}
                <div className={total.containerTitle}>
                    <h1>Mi Compra</h1>
                </div>
                <div className={total.containerValue}>
                    <div className={total.containerSubTotal}>
                        <h2>SubTotal</h2>
                        <p>${idsProducts}</p>
                    </div>
                    <div className={total.containerSent}>
                        <h2>Gastos De Envio</h2>
                        <p>${send}</p>
                    </div>

                    <div className={total.containerTotal}>
                        <h2>Total</h2>
                        <p>${priceTotal}</p>
                    </div>
                </div>
            </div>
            <div className={total.containerButton}>

                <button onClick={handleOrder}
                    className={total.buttonFinal}>Finalizar Compra
                    </button>
            </div>
        </>
    )
}

export default ShoppingTotal
