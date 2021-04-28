import { useState, useEffect } from 'react'
import total from './ShoppingTotal.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../redux/reducers';
import { deleteCart } from '../../redux/actions'
import { NEW_ORDER } from "../../gql/shopingCart"
import { Cookies } from "react-cookie";
import { toast } from "react-toastify"
import { ACTUAL_USER, GET_USERS } from "../../gql/login";
import { useMutation, useQuery, gql } from '@apollo/client';
import {Link} from 'react-router-dom';

interface user {
    currentUser: {
        name: string,
        password: string,
        email: string,
        privilege: string
    }
  }
  

const ShoppingTotal = (): JSX.Element => {

    let user:any = {}

    const currentU = useQuery<user>(ACTUAL_USER)

    user = currentU?.data?.currentUser

    const [createOrder, { data }] = useMutation(NEW_ORDER)
    const dispatch = useDispatch()
    const {priceSubTotal, idUsers} = useSelector((store: AppState) => store.shoppingCartReducer)
    const [priceTotal, setPriceTotal] = useState(0)
    const [send, setSend] = useState(500)
    const [order, setOrder] = useState([])
    const [gotcookie, setGotcookie] = useState(false)
    const cookie = new Cookies

    useEffect(() => {
        cookie.get('User') ? setGotcookie(true) : setGotcookie(false);
    }, [cookie])

    useEffect(() => {
        setPriceTotal(priceSubTotal + send)
    }, [priceSubTotal])

    const handleOrder = () => {
        if (localStorage.getItem('productsLocal') && gotcookie === true) {
            // let productLocal: any = []
            // productLocal = (localStorage.getItem('productsLocal'))
            // productLocal = (JSON.parse(productLocal))
            // setOrder(productLocal)
            // localStorage.clear()
            // dispatch(deleteCart())
            createOrder({ variables: { status: 'pendiente', idUser: idUsers } })
                .then((resolve) => { 
                    localStorage.setItem('productsLocal', JSON.stringify([]))
                    console.log(data) })
                .catch((err) => { console.log('Salio Mal') })
            window.location.href = 'http://localhost:3000/Pago'
        }
        else {
            toast.error("Debes iniciar sesión para realizar una compra")
        }
    }

    

   
    return (
        <>
            <div className={total.containerOrden}>
                <div className={total.containerTitle}>
                    <h1>Mi Compra</h1>
                </div>
                <div className={total.containerValue}>
                    <div className={total.containerSubTotal}>
                        <h2>SubTotal</h2>
                        <p>${new Intl.NumberFormat().format(priceSubTotal )}</p>
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
            {user?.privilege ==='user' ?
            <div className={total.containerButton}>

                <button 
                onClick={handleOrder}
                    className={total.buttonFinal}>Finalizar Compra
                    </button>
            </div>
            :
            <div className={total.containerButton}>
                <h1 className={total.titlefinish} > Debe estar Logueado para finalizar la compra</h1>
                <Link to='/Login'>
                    <button
                    className={total.buttonFinal}
                    >Login</button>
                </Link>
            </div>}
        </>
    )
}

export default ShoppingTotal
