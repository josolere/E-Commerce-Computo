import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Card.module.scss'
import { Link } from 'react-router-dom'
import { addShopping, local, addProductHome, addProductDetails } from '../../redux/actions'
import { AppState } from '../../redux/reducers';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Rstyles from './ResponsiveCard.module.scss';

interface props {
    id?: number
    name: string
    image: string
    price: number
    count: number
    stock: number
}

export default function Card({ name, image, price, id, count, stock }: props) {

    const dispatch = useDispatch()
    var { quantity, priceSubTotal, productTotal, idDetails, priceDetails, countDetails, addHome, addCart }: any = useSelector((store: AppState) => store.shoppingCartReducer)

    const [stateHome, setStateHome] = useState(true)

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
            var valor: any = productLocal.find((el: any) => el.id === id)
            if (valor) {
                valor.count = valor.count + 1
                var newLocal = productLocal.filter((filt: any) => filt.id !== id).concat(valor)
            } else {
                var newLocal = productLocal.filter((filt: any) => filt.id !== id)
                newLocal.push(idProduct)
            }
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

        dispatch(addShopping({ id, price, count }));
        addLocaStorage();

    }

    if (addCart === true && addHome === true) {
        handleAddProduct()
        const state = false
        setStateHome(false)
        dispatch(addProductDetails(state));
        dispatch(addProductHome(state))

    }

    return (
        <div className={Rstyles.cardContainer}>
            <div className={Rstyles.ContainerTitle} >
                <h4 className={Rstyles.Name}>{name}</h4>
            </div>
            <div className={Rstyles.ContainerImage} >
                <Link
                    onClick={() => dispatch(addProductHome({ stateHome, id, price, count }))}
                    to={{
                        pathname: '/Detalles',
                        state: {
                            id: id,
                            newprice: 0
                        }
                    }}>
                    <img className={Rstyles.CardImage} src={image} alt="notfoundimg" />
                </Link>
            </div>
            <div className={Rstyles.EndContainer}>
                <button className={Rstyles.Price}>${new Intl.NumberFormat().format(price)}</button>
                <button
                    onClick={() => {
                        handleAddProduct();
                    }}
                    className={Rstyles.AddToCart}>
                    <FontAwesomeIcon icon={faCartPlus} /></button>
            </div>
        </div>

    );



}