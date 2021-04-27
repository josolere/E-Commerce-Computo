import { useState, useEffect } from 'react'
import total from './ShoppingTotal.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../redux/reducers';
import { deleteCart } from '../../redux/actions'
import { useMutation } from '@apollo/client';
import { NEW_ORDER } from "../../gql/shopingCart"
import { Cookies } from "react-cookie";
import { toast } from "react-toastify"


const ShoppingTotal = (): JSX.Element => {

    const [createOrder, { data }] = useMutation(NEW_ORDER)
    const dispatch = useDispatch()
    const idsProducts: number = useSelector((store: AppState) => store.shoppingCartReducer.priceSubTotal)
    const [priceTotal, setPriceTotal] = useState(0)
    const [send, setSend] = useState(500)
    const [order, setOrder] = useState([])
    const [gotcookie, setGotcookie] = useState(false)
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
            createOrder({ variables: { status: 'pending', idUser: 1 } })
                .then((resolve) => { console.log(data) })
                .catch((err) => { console.log('Salio Mal') })
            window.location.href = 'http://localhost:3000/Pago'
        }
        else {
            toast.error("Debes iniciar sesión para realizar una compra")
        }
    }

    

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

                <button onClick={handleOrder}
                    className={total.buttonFinal}>Finalizar Compra
                    </button>
            </div>
        </>
    )
}

export default ShoppingTotal
