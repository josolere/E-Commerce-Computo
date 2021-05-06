import React, { useState, useEffect } from 'react'
import total from './ShoppingTotal.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../redux/reducers';
import { deleteCart } from '../../redux/actions'
import { NEW_ORDER } from "../../gql/shopingCartGql"
import { Cookies } from "react-cookie";
import { toast } from "react-toastify"
import { ACTUAL_USER, GET_USERS } from "../../gql/loginGql";
import { useMutation, useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

interface user {
    currentUser: {
        name: string,
        password: string,
        email: string,
        privilege: string
    }
}
interface props {
    products:any[]
}




const ShoppingTotal = (props:props): JSX.Element => {

    let user: any = {}

    const currentU = useQuery<user>(ACTUAL_USER)

    user = currentU?.data?.currentUser

    const [createOrder, { data }] = useMutation(NEW_ORDER)
    const dispatch = useDispatch()
    const { priceSubTotal, idUsers } = useSelector((store: AppState) => store.shoppingCartReducer)
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

    // useEffect(() => {
    //     if (logeo === true) {
    //         // createOrder({ variables: { status: status, idUser: idUser } })
    //         //     .then((resolve) => { console.log(data) })
    //         //     .catch((err) => { console.log('no resuelto') })
    //     }

    // }, [])

    const handleOrder = () => {
        if (user) {
            // let productLocal: any = []
            // productLocal = (localStorage.getItem('productsLocal'))
            // productLocal = (JSON.parse(productLocal))
            // setOrder(productLocal)
            // localStorage.clear()
            // dispatch(deleteCart())
            // createOrder({ variables: { status: 'pendiente', idUser: idUsers } })
            //     .then((resolve) => { 
            //         localStorage.setItem('productsLocal', JSON.stringify([]))
            //         console.log(data) })
            //     .catch((err) => { console.log('Salio Mal') })
            window.location.href = 'http://localhost:3000/Envios'
        }
        else {
            toast.error("Debes iniciar sesión para realizar una compra")
        }
    }

    console.log(props.products)
    return (
        <div className={total.disaster} >
                <div className={total.containerTitle} >
                    <h2 className={total.specialTitle} >Su Compra</h2>
                    {!props.products.length?
                        <Link to='/Home' 
                            className={total.buttonEnd}>Agregar Productos</Link>
                    :
                    user?.privilege === 'user' ?
                        <Link to='/Envios' onClick={() => { handleOrder() }}
                            className={total.buttonEnd}>Finalizar Compra</Link>
                    :
                        <Link to='/Login'>
                            <button
                                className={total.buttonEnd}
                            >Login</button>
                        </Link>
                    }
                </div>
                <div className={total.containerValue}>
                    <div className={total.containerSubTotal}>

                        <h1 className={total.titles} >SubTotal</h1>
                        <p className={total.amounts} >${new Intl.NumberFormat().format(priceSubTotal)}</p>
                    </div>
                    <div className={total.containerSubTotal}>
                        <h1 className={total.titles}  >Gastos De Envío</h1>
                        <p className={total.amounts}>${new Intl.NumberFormat().format(send)}</p>
                    </div>

                    <div className={total.containerTotal}>
                        <h1 className={total.titles}  >Total</h1>
                        <p className={total.amounts}>${new Intl.NumberFormat().format(priceTotal)}</p>

                    </div>
                </div>

        </div>
    )
}

export default ShoppingTotal
