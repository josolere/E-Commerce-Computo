import React, { useState, useEffect } from 'react'
import cart from './ShoppingCard.module.scss'
import { useQuery, gql } from '@apollo/client';
import { useDispatch } from 'react-redux'
import { deleteProduct, morePrice, lessPrice } from '../../redux/actions'

interface DetailsProduct {
    id: number,
    brand: string,
    image: string,
    name: string,
    price: number,
    details: string,
}

interface DetailsData {
    getProductById: DetailsProduct[]
}

interface props {
    id: number
    count: number
    priceProps: number
}

const products = gql`
    query ($id: ID!){
        getProductById (id:$id) {
            id
            name
            price
            image
            details
        }
    }
`;

const ShoppingCard = (props: props): JSX.Element => {
    const idsProducts = props.id
  
    const { loading, error, data } = useQuery<DetailsData>(products, { variables: { id: idsProducts } })
    const product: any = data?.getProductById

    const [price, setPrice] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!loading) {
            setPrice(product.price * props.count)
        }
    }, [product])

    const accountantMore = () => {
        let productId = product.id
        let count = props.count + 1
        let productPrice = product.price
        setPrice(price + product.price)
        dispatch(morePrice({ productPrice, count, productId }))
    }
    const addLocaStorageMore = async () => {
        const idProduct: any = {
            id: product.id,
            price: product.price,
            count: props.count + 1,
            image: product.image,
            details: product.details
        }
        if (localStorage.getItem('productsLocal')) {
            let productLocal: any = await (localStorage.getItem('productsLocal'))
            productLocal = JSON.parse(productLocal)
            const newLocal = productLocal.filter((filt: any) => filt.id !== product.id)
            newLocal.push(idProduct)
            localStorage.setItem('productsLocal', JSON.stringify(newLocal))
        }
        if (localStorage.getItem('quantity')) {
            let quantity: any = await (localStorage.getItem('quantity'))
            quantity = JSON.parse(quantity)
            const addMoreQuantity = quantity + 1
            localStorage.setItem('quantity', JSON.stringify(addMoreQuantity))
        }
        if (localStorage.getItem('priceSubTotal')) {
            let priceSubTotal: any = await (localStorage.getItem('priceSubTotal'))
            priceSubTotal = JSON.parse(priceSubTotal)
            const addMoreSubTotal = priceSubTotal + product.price
            localStorage.setItem('priceSubTotal', JSON.stringify(addMoreSubTotal))
        }
    }

    const accountantLess = () => {
        if (props.count !== 1) {
            let productPrice = product.price
            let productId = product.id
            let count = props.count - 1
            setPrice(price - product.price)
            dispatch(lessPrice({ productPrice, productId, count }))
        } else {
            return props.count
        }
    }

    const addLocaStorageLess = async () => {
        const idProduct: any = {
            id: product.id,
            price: product.price,
            count: props.count - 1,
            image: product.image,
            details: product.details
        }
        if (localStorage.getItem('productsLocal')) {
            let productLocal: any = await (localStorage.getItem('productsLocal'))
            productLocal = JSON.parse(productLocal)
            const newLocal = productLocal.filter((filt: any) => filt.id !== product.id)
            newLocal.push(idProduct)
            localStorage.setItem('productsLocal', JSON.stringify(newLocal))
        }
        if (localStorage.getItem('quantity')) {
            let quantity: any = await (localStorage.getItem('quantity'))
            quantity = JSON.parse(quantity)
            let addlessQuantity: any = quantity - 1
            localStorage.setItem('quantity', JSON.stringify(addlessQuantity))
        }
        if (localStorage.getItem('priceSubTotal')) {
            let priceSubTotal: any = await (localStorage.getItem('priceSubTotal'))
            priceSubTotal = JSON.parse(priceSubTotal)
            const lessMoreSubTotal = priceSubTotal - product.price
            localStorage.setItem('priceSubTotal', JSON.stringify(lessMoreSubTotal))
        }
    }

    const eliminateProduct = () => {
        let prductId = product.id
        let priceProduct = product.price
        let total = priceProduct * props.count
        let count = props.count
        dispatch(deleteProduct({ prductId, total, count }))
    }

    const deleteLocaStorageLess = () => {
        if (localStorage.getItem('productsLocal')) {
            let productLocal: any = (localStorage.getItem('productsLocal'))
            productLocal = JSON.parse(productLocal)
            const newLocal = productLocal.filter((filt: any) => filt.id !== product.id)
            localStorage.setItem('productsLocal', JSON.stringify(newLocal))

            const newquantity = productLocal.filter((filt: any) => filt.id === product.id)
            let quantity: any = localStorage.getItem('quantity')
           
            let quantityDelete = quantity - newquantity[0].count
            localStorage.setItem('quantity', JSON.stringify(quantityDelete))

            const newSubTotal = productLocal.filter((filt: any) => filt.id === product.id)
            let SubTotal: any = localStorage.getItem('priceSubTotal')
           
            let priceSubTotal = SubTotal - (newquantity[0].price *  newquantity[0].count)
            localStorage.setItem('priceSubTotal', JSON.stringify(priceSubTotal))
        }
    }

    return (
        <>
            {
                loading ? <h2>Cargando...</h2> :
                    <div className={cart.containerCard}>
                        <div className={cart.containerImg}>
                            <img className={cart.image} src={product.image} alt="producto" />
                        </div>
                        <div className={cart.containerTitle}>
                            <h1>{product.name}</h1>
                            <p>{product.details} </p>
                        </div>
                        <div className={cart.count}>
                            <button
                                id={props.count > 1 ? cart.buttonLess : undefined}
                                className={cart.buttonCountLess}
                                onClick={() => {
                                    accountantLess();
                                    addLocaStorageLess()
                                }}
                            >-</button>
                            <p>{props.count}</p>
                            <button
                                className={cart.buttonCountMore}
                                onClick={() => {
                                    addLocaStorageMore()
                                    accountantMore();
                                }}
                            >+</button>
                        </div>
                        <div className={cart.containerPrice}>
                            <p className={cart.price}>${price}</p>
                        </div>
                        <div className={cart.containerClose}>
                            <button
                                onClick={() => {
                                    eliminateProduct();
                                    deleteLocaStorageLess();
                                }}
                                className={cart.buttonClose}>Eliminar</button>
                        </div>
                    </div>
            }
        </>
    )
}

export default ShoppingCard
