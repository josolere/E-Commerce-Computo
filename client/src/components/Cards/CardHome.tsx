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
import { FiHeart } from 'react-icons/fi'
import { useMutation, useQuery } from '@apollo/client'
import { TOGGLE_WISHLIST, WISHLIST } from '../../gql/wishlist'
import { ACTUAL_USER } from '../../gql/loginGql'
import { AiFillCloseSquare } from "react-icons/ai";


interface props {
    id?: number
    name: string
    image: string
    price: number
    count: number
    stock:number
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
            var valor:any= productLocal.find((el:any)=> el.id === id)
            if(valor){
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
        if(idDetails > 0){
            id=idDetails
            price=priceDetails
            count=countDetails
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

    const [wishe, setWish] =  useState(false)

    const { data , loading , error} = useQuery(ACTUAL_USER)
    const user = data?.currentUser

    const [wish,reswish] = useMutation(TOGGLE_WISHLIST,{
        refetchQueries:[{query:WISHLIST,variables:{userId:user?.id}}]
    })

    const wishes = useQuery(WISHLIST,{variables:{userId:user?.id}})
    const list = wishes?.data?.getWishList

    const handleFav = (e: React.FormEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        wish({variables:{userId:user?.id,productId: id}})
    }

    useEffect(()=>{
        setWish(list?.some((product : any) => product.id === id))
        console.log()
    },[wishes,reswish])

    return (
        <div className={styles.card}>

            <div className={styles.name}>{name}</div>

        {user?
        <button onClick={handleFav} className={wishe ? styles.faving : styles.fav}><FiHeart size={20}/></button>
        :
        <button className={styles.fav}><Link to="/Login"><FiHeart size={20}/></Link></button>
        }
            <Link
                onClick={() => dispatch(addProductHome({stateHome,id, price, count}))}
                className={styles.link} style={{ textDecoration: 'none' }} to={{
                    pathname: '/Detalles',
                    state: {
                        id: id,
                        newprice: 0
                    }
                }}>
                <img style={{ width: '100%', height: 'auto' }} src={image} alt="notfoundimg"/>
            </Link>

            <div className={styles.buttons}>
                <button className={styles.buy}>${new Intl.NumberFormat().format(price)}</button>
                {stock > 0 ? <button
                    onClick={() => {
                        handleAddProduct();
                    }}
                    className={styles.addCart}>
                    <FontAwesomeIcon icon={faCartPlus} /></button>
                :
                <button className={styles.noAddCart}> 
                <Link to={{
                    pathname: '/Detalles',
                    state: {
                        id: id,
                        newprice: 0
                    }
                }}>
                <AiFillCloseSquare/>   
                </Link>
                </button> 
                }
            </div>
        </div>

    );



}