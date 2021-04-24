import { useState, useEffect } from 'react'
import total from './ShoppingTotal.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../redux/reducers';
import { deleteCart } from '../../redux/actions'
<<<<<<< HEAD
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { NEW_ORDER} from "../../gql/shopingCart"



const ShoppingTotal = (): JSX.Element => {
    const [createOrder, { data }] = useMutation(NEW_ORDER)

=======
=======
import { useMutation } from '@apollo/client';
>>>>>>> LogFront
import { NEW_ORDER } from "../../gql/shopingCart"
import { Cookies } from "react-cookie";
import { toast } from "react-toastify"


const ShoppingTotal = (): JSX.Element => {

    const [createOrder, { data }] = useMutation(NEW_ORDER)
<<<<<<< HEAD
>>>>>>> front_roto
=======
>>>>>>> LogFront
    const dispatch = useDispatch()
    const idsProducts: number = useSelector((store: AppState) => store.shoppingCartReducer.priceSubTotal)
    const [priceTotal, setPriceTotal] = useState(0)
    const [send, setSend] = useState(500)
    const [order, setOrder] = useState([])
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> LogFront
    const [gotcookie, setGotcookie] = useState(false)
    const cookie = new Cookies

    useEffect(() => {
        cookie.get('User') ? setGotcookie(true) : setGotcookie(false);
    }, [cookie])

<<<<<<< HEAD
>>>>>>> front_roto
=======
>>>>>>> LogFront
    useEffect(() => {
        setPriceTotal(idsProducts + send)
    }, [idsProducts])

    const handleOrder = () => {
<<<<<<< HEAD
<<<<<<< HEAD
        if (localStorage.getItem('productsLocal')) {
=======
        if (localStorage.getItem('productsLocal') && gotcookie === true) {
>>>>>>> front_roto
=======
        if (localStorage.getItem('productsLocal') && gotcookie === true) {
>>>>>>> LogFront
            let productLocal: any = []
            productLocal = (localStorage.getItem('productsLocal'))
            productLocal = (JSON.parse(productLocal))
            setOrder(productLocal)
            localStorage.clear()
            dispatch(deleteCart())
<<<<<<< HEAD
<<<<<<< HEAD
            console.log(productLocal)
            console.log(order)
            createOrder({ variables: {status:'pending', idUser:1} } )
            .then((resolve) => { console.log(data) })
            .catch((err) => { console.log('Salio Mal') })

        }
    }


  

    console.log(order)

=======
=======
>>>>>>> LogFront
            createOrder({ variables: { status: 'pending', idUser: 1 } })
                .then((resolve) => { console.log(data) })
                .catch((err) => { console.log('Salio Mal') })
            window.location.href = 'http://localhost:3000/Pago'
        }
        else {
            toast.error("Debes iniciar sesión para realizar una compra")
        }
    }

    
<<<<<<< HEAD
>>>>>>> front_roto
=======
>>>>>>> LogFront

    return (
        <>
            <div className={total.containerOrden}>
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
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> front_roto
=======

>>>>>>> LogFront
                    <div className={total.containerTotal}>
                        <h2>Total</h2>
                        <p>${priceTotal}</p>
                    </div>
                </div>
            </div>
            <div className={total.containerButton}>
<<<<<<< HEAD
<<<<<<< HEAD
                <Link to='/pago' onClick={() => { handleOrder() }}
                    className={total.buttonFinal}>Finalizar Compra</Link>

=======
=======
>>>>>>> LogFront

                <button onClick={handleOrder}
                    className={total.buttonFinal}>Finalizar Compra
                    </button>
<<<<<<< HEAD
>>>>>>> front_roto
=======
>>>>>>> LogFront
            </div>
        </>
    )
}

export default ShoppingTotal
