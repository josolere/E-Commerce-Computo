import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Card.module.scss'
import { Link } from 'react-router-dom'
import { addShopping, local } from '../../redux/actions'
import { AppState } from '../../redux/reducers';

interface props {
    id?: number
    name: string
    image: string
    price: number
    count: number
    details: string
}

export default function Card({ name, image, price, id, count, details }: props) {
    const dispatch = useDispatch()
    const {quantity, priceSubTotal, productTotal}: any = useSelector((store: AppState) => store.shoppingCartReducer)

    function useSendSelector() {    //  hook personalizado para evitar conflicto al ejecutar useSelector
        const firsstRender = useRef(true) // evita ejecutar el useEffect cuando se renderize el componente
        const idsProducts: any[] = useSelector((store: AppState) => store.shoppingCartReducer.local)

        if(quantity !== 0){
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
            details: details
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

    const handleAddProduct = () =>{
        let productRepet = productTotal.filter((filt:any)=> filt.id === id)
        if(productRepet.length === 0){
            dispatch(addShopping({ id, price, count }));
            addLocaStorage();
        }
    }

    return (
        <div className={styles.card}>
            <img style={{ width: '10rem', height: 'auto' }} src={image} />
            <span style={{ margin: '0rem 0rem 1rem 1rem' }}>{name}</span>
            <div className={styles.buttons}>
                <Link to={{
                    pathname: '/Detalles',
                    state: {
                        id: id
                    }
                }}>
                    <button className={styles.learn}>Detalles del Producto</button>
                </Link>
                <button
                    onClick={() => {
                        handleAddProduct();
                    }}
                    className={styles.buy}>${new Intl.NumberFormat().format(price)}</button>
            </div>
        </div>
    )
}