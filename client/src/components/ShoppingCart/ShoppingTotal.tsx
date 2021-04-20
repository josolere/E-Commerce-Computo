import { useState, useEffect } from 'react'
import total from './ShoppingTotal.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../redux/reducers';
import { deleteCart } from '../../redux/actions'
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { NEW_ORDER, NEW_ORDER_DETAIL} from "../../gql/shopingCart"


const ShoppingTotal = (): JSX.Element => {
    const [createOrder, data ] = useMutation(NEW_ORDER)
    const [createOrderDetail, results ] = useMutation(NEW_ORDER_DETAIL)


    const dispatch = useDispatch()
    const idsProducts: number = useSelector((store: AppState) => store.shoppingCartReducer.priceSubTotal)
    const [priceTotal, setPriceTotal] = useState(0)
    const [send, setSend] = useState(500)
    const [order, setOrder] = useState([])
    useEffect(() => {
        setPriceTotal(idsProducts + send)
    }, [idsProducts])

    const handleOrder = () => {
        if (localStorage.getItem('productsLocal')) {
            let productLocal: any = []
            productLocal = (localStorage.getItem('productsLocal'))
            productLocal = (JSON.parse(productLocal))
            setOrder(productLocal)
            localStorage.clear()
            dispatch(deleteCart())
            console.log(productLocal)
            console.log(order)
            productLocal.map((mapeo:any)=>{
                createOrder({ variables: {status:"pending", idUser:2} } )
                .then((resolve) => { console.log(data) })
                .catch((err) => { console.log('Salio Mal') })
            })          
            //---------------------------------------------------------------
            // createOrderDetail({ variables: {idProduct:4, idOrder:1, quantity:2} } )
            // .then((resolve) => { console.log(results) })
            // .catch((err) => { console.log('Salio Mal') })
        }
    }  

    console.log(order)


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
                    <div className={total.containerTotal}>
                        <h2>Total</h2>
                        <p>${priceTotal}</p>
                    </div>
                </div>
            </div>
            <div className={total.containerButton}>
                <Link to='/pago' onClick={() => { handleOrder() }}
                    className={total.buttonFinal}>Finalizar Compra</Link>

            </div>
        </>
    )
}

export default ShoppingTotal
