import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Card.module.scss'
import { Link } from 'react-router-dom'
import { addShopping, local, addProductHome, orderPending, addProductDetails } from '../../redux/actions'
import { AppState } from '../../redux/reducers';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoCloseCircleSharp } from 'react-icons/io5'
import { FiHeart } from 'react-icons/fi'
import { useQuery, gql, useMutation } from '@apollo/client';
import { NEW_ORDER_DETAIL } from "../../gql/shopingCart"
import {GET_ORDER_BY_StATUS } from "../../gql/orders"



interface props {
    id?: number
    name: string
    image: string
    price: number
    count: number
    stock:number
    wish?:boolean
}

export default function Card({ name, image, price, id, count, stock, wish }: props) {

    const dispatch = useDispatch()
    const { quantity, priceSubTotal, productTotal, idDetails,
        priceDetails, countDetails, logeo, idOrder, addHome, addCart, idUsers }: any = useSelector((store: AppState) => store.shoppingCartReducer)

    const [createOrderDetail] = useMutation(NEW_ORDER_DETAIL,{
        refetchQueries:[{query:GET_ORDER_BY_StATUS,variables:{ status: "pendiente", idUser:idUsers}}]
    })

  


    const [stateHome, setStateHome] = useState(true)
    const [AddProductReload, setAddProductReload] = useState(false)

    const notify = () => toast.dark("Agregado Al Carrito");

    function useSendSelector() {    //  hook personalizado para evitar conflicto al ejecutar useSelector
        const firsstRender = useRef(true) // evita ejecutar el useEffect cuando se renderize el componente
        const idsProducts: any[] = useSelector((store: AppState) => store.shoppingCartReducer.local)

        if (quantity !== 0) {
            localStorage.setItem('quantity', JSON.stringify(quantity))
            localStorage.setItem('priceSubTotal', JSON.stringify(priceSubTotal))
        }

        useEffect(() => {
            if (firsstRender.current) {
                firsstRender.current = false;
            } else {
                localStorage.setItem('productsLocal', JSON.stringify(idsProducts))
            }
        }, [idsProducts])
    }


    const addLocaStorage = () => {
        const idProduct: any = {
            id: id,
            price: price,
            count: count,
            image: image,
            name: name,
        }

        if (localStorage.getItem('productsLocal')) {
            let productLocal: any = (localStorage.getItem('productsLocal'))
            productLocal = JSON.parse(productLocal)
            const newLocal = productLocal.filter((filt: any) => filt.id !== id)
            newLocal.push(idProduct)
            localStorage.setItem('productsLocal', JSON.stringify(newLocal))
        } else {
            dispatch(local(idProduct))
        }
    }
    useSendSelector()

    const handleAddProduct = () => {
        if (idDetails > 0) {
            id = idDetails
            price = priceDetails
            count = countDetails
        }
        let productRepet = productTotal.filter((filt: any) => filt.id === id)
        if (productRepet.length === 0) {
            dispatch(addShopping({ id, price, count }));
            addLocaStorage();
            notify()
            logeo && createOrderDetail({ variables: { idOrder: idOrder, idProduct: id, quantity: count } })
                .then((resolve) => {
                    console.log('resolve')
                })
                .catch((error) => {
                    console.log('no responde')
                })

        }
    }

            
    if (addCart === true && addHome === true) {
        handleAddProduct()
        const state = false
        setStateHome(false)
        dispatch(addProductDetails(state));
        dispatch(addProductHome(state))

    }

    const [wishe, setWish] =  useState(false)

    const handleFav = (e: React.FormEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        setWish(!wishe)
        console.log('falta crear la wishlist en base de datos y conectar')
    }



    return (
        <div className={styles.card}>
            {/* <ToastContainer /> */}
<button onClick={handleFav} className={wishe ? styles.faving : styles.fav}><FiHeart size={20}/></button>
            <Link
                onClick={() => dispatch(addProductHome({ stateHome, id, price, count }))}
                className={styles.link} style={{ textDecoration: 'none' }} to={{
                    pathname: '/Detalles',
                    state: {
                        id: id,
                        newprice: 0
                    }
                }}>
                <img style={{ width: '100%', height: 'auto' }} src={image} alt="notfoundimg" />
            </Link>

            {/* <div className={styles.buy}>${new Intl.NumberFormat().format(price)}</div> */}
            <div className={styles.buttons}>
                <button className={styles.buy}>${new Intl.NumberFormat().format(price)}</button>

                {stock ? <button
                    onClick={() => {
                        handleAddProduct();
                    }}
                    className={styles.addCart}>
                    <FontAwesomeIcon icon={faCartPlus} /></button>
                :
                
                <button className={styles.noAddCart}><Link to={{
                    pathname: '/Detalles',
                    state: {
                        id: id,
                        newprice: 0
                    }
                }}><IoCloseCircleSharp color='whitesmoke' style={{margin:"0rem 1rem"}} /></Link></button>    
                }
            </div>
        </div>

    );



}
