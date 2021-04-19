import React, { useState, useEffect, useRef, useLayoutEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Card.module.scss'
import { Link } from 'react-router-dom'
import { addShopping, local, addProductDetails, addProductHome } from '../../redux/actions'
import { AppState } from '../../redux/reducers';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";


interface props {
    id?: number
    name: string
    image: string
    price: number
    count: number
}

export default function Card({ name, image, price, id, count }: props) {
    const dispatch = useDispatch()
    const { quantity, priceSubTotal, productTotal, addCart, addHome,idDetails,priceDetails,countDetails }: any = useSelector((store: AppState) => store.shoppingCartReducer)

    const [stateHome, setStateHome] = useState(true)

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
        if(idDetails >0){
            id=idDetails
            price=priceDetails
            count=countDetails
        }
        let productRepet = productTotal.filter((filt: any) => filt.id === id)
        if (productRepet.length === 0) {
            dispatch(addShopping({ id, price, count }));
            addLocaStorage();
        }
    }

        if (addCart === true && addHome === true) {
            handleAddProduct()
            const state = false
            setStateHome(false)
            dispatch(addProductDetails(state));
            dispatch(addProductHome(state))
        }


    // const nameoftheday = (fecha: any) => [
    //     'Domingo',
    //     'Lunes',
    //     'Martes',
    //     'Miércoles',
    //     'Jueves',
    //     'Viernes',
    //     'Sabado',
    // ][new Date(fecha).getDay()];

    // const current = new Date();

    // const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    // let dayoftheweek = (nameoftheday(current))

    // let discountoftheweek: Array<any> = ['10%', '20%', '25%', '20%', '35%', '20%', '15%'];

    // let discount: string = '0%';

    // if (dayoftheweek === 'Lunes') {
    //     discount = discountoftheweek[0]
    // }
    // else if (dayoftheweek === 'Martes') {
    //     discount = discountoftheweek[1]
    // }
    // else if (dayoftheweek === 'Miercoles') {
    //     discount = discountoftheweek[2]
    // }
    // else if (dayoftheweek === 'Jueves') {
    //     discount = discountoftheweek[3]
    // }
    // else if (dayoftheweek === 'Viernes') {
    //     discount = discountoftheweek[4]
    // }
    // else if (dayoftheweek === 'Sabado') {
    //     discount = discountoftheweek[5]
    // }
    // else if (dayoftheweek === 'Domingo') {
    //     discount = discountoftheweek[6]
    // }
    // let discountoapply = parseInt(discount)

    // let newprice: any
    // newprice = price - (price * discountoapply / 100)
    // newprice = parseInt(newprice) */

    return (
        <div className={styles.card}>
<<<<<<< HEAD
            <div className={styles.name}>{name}</div>
=======
                <div className={styles.name}>{name}</div>
>>>>>>> 118e40cba73c0c3de2fe1598a2ee20780010fdc3
            <Link
                onClick={() => dispatch(addProductHome({stateHome,id, price, count}))}
                className={styles.link} style={{ textDecoration: 'none' }} to={{
                    pathname: '/Detalles',
                    state: {
                        id: id,
                        newprice: 0
                    }
                }}>
                <img style={{ width: '100%', height: 'auto' }} src={image} />
            </Link>

            {/* <div className={styles.buy}>${new Intl.NumberFormat().format(price)}</div> */}
            <div className={styles.buttons}>
                <button className={styles.buy}>${new Intl.NumberFormat().format(price)}</button>
                <button
                    onClick={() => {
                        handleAddProduct();
                    }}
                    className={styles.addCart}>
                    <FontAwesomeIcon icon={faCartPlus} /></button>
            </div>
        </div>

    );



}
