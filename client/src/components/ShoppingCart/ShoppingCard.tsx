import { useState, useEffect, useRef } from 'react'
import cart from './ShoppingCard.module.scss'
import { useQuery, useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, morePrice, lessPrice } from '../../redux/actions'
import { PRODUCTS } from "../../gql/shopingCart"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EDIT_ORDER_DETAIL, GET_ORDER_LIST, DELETE_ORDER_DETAIL } from "../../gql/order"
import { AppState } from '../../redux/reducers';



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

interface detailOrderid {
    getOrdersByIdUser: detailsorder[]

}

interface detailsorder {
    id: number,
    status: string,
    details: detail[]
}

interface detail {
    details: orderdetails[],
    id: number
}

interface orderdetails {
    id: number,
    ProductId: number,
    quantity: number,
    price: number,
    productName: string
}

const ShoppingCard = (props: props): JSX.Element => {

    const { logeo, idUsers }: any = useSelector((store: AppState) => store.shoppingCartReducer)

    const idsProducts = props.id

    const { loading, error, data } = useQuery<DetailsData>(PRODUCTS, { variables: { id: idsProducts } })
    const product: any = data?.getProductById

    const idProductOrder = useQuery<detailOrderid>(GET_ORDER_LIST, {
        variables: { idUser: idUsers }
    })


    const deletePro = () => toast.error("Producto Eliminado");

    const [price, setPrice] = useState(0)
    const [idEdit, setIdEdit] = useState(0)
    const dispatch = useDispatch()

    const [editOrderDetail] = useMutation(EDIT_ORDER_DETAIL)
    const [deleteOrderDetail] = useMutation(DELETE_ORDER_DETAIL)


    useEffect(() => {
        if (!loading) {
            setPrice(product.price * props.count)
        }
    }, [product])


    useEffect(() => {
        console.log(idProductOrder)
        if (idProductOrder.data && logeo === true) {
            console.log(idProductOrder)
            let arrayOrders: any = idProductOrder.data.getOrdersByIdUser.filter((filt) => filt.status === 'pendiente')
            console.log(arrayOrders)
            if (arrayOrders.length > 0) {
                if (arrayOrders[0].details.length > 0 && data) {
                    let newArrayOrder = arrayOrders[0].details.filter((filtt: any) => filtt.id !== product.id)
                    let newArrayodOrder = newArrayOrder.filter((filt: any) => filt.ProductId === idsProducts)
                    console.log(newArrayodOrder)
                    if (newArrayodOrder.length > 0) {
                        let re: any = newArrayodOrder[0].id
                        setIdEdit(re)
                        // setIdProOrder(newArrayodOrder)
                    }
                }
            }
        }
    }, [idProductOrder])


    const accounrMoreBases = () => {
        let productId = product.id
        let count = props.count + 1
        let productPrice = product.price
        setPrice(price + product.price)
        dispatch(morePrice({ productPrice, count, productId }))
        if (logeo === true) {
            editOrderDetail({ variables: { id: idEdit, price: productPrice * count, quantity: count } })
                .then((resolve) => {
                    console.log(resolve)
                })
                .catch((error) => {
                    console.log('no responde')
                })
        }
    }

    const accountantMore = async () => {
        console.log(idEdit)

        if (idProductOrder.data !== undefined) {
            accounrMoreBases()
        }
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


    const accountantLessBases = () => {
        if (props.count !== 1) {
            let productPrice = product.price
            let productId = product.id
            let count = props.count - 1
            setPrice(price - product.price)
            dispatch(lessPrice({ productPrice, productId, count }))
            if (logeo === true) {

                editOrderDetail({ variables: { id: idEdit, price: productPrice * count, quantity: count } })
                    .then((resolve) => {
                        console.log(resolve)
                    })
                    .catch((error) => {
                        console.log('no responde')
                    })
            } else {
                return props.count
            }
        }
    }


    const accountantLess = async () => {
        console.log(idEdit)

        if (idProductOrder.data !== undefined) {
            accountantLessBases()
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

    const eliminateProductBases = () => {
        console.log(idEdit)

        let prductId = product.id
        let priceProduct = product.price
        let total = priceProduct * props.count
        let count = props.count
        dispatch(deleteProduct({ prductId, total, count }))
        // setDeleteItme(true)
        if (logeo === true) {

            deleteOrderDetail({ variables: { id: idEdit } })
                .then((resolve) => {
                    console.log('resolve')
                })
                .catch((error) => {
                    console.log('no responde')
                })
        }
    }

    const eliminateProduct = async () => {
        if (idProductOrder.data !== undefined) {
            eliminateProductBases()
        }
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

            let priceSubTotal = SubTotal - (newquantity[0].price * newquantity[0].count)
            localStorage.setItem('priceSubTotal', JSON.stringify(priceSubTotal))
        }
    }

    return (
        <>
            {
                <div className={cart.containerCard}>
                    {/* <ToastContainer /> */}
                    <div className={cart.containerImg}>
                        <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={product?.image} alt="producto" />
                    </div>
                    <div className={cart.containerOthers}>
                        <h1>{product?.name}</h1>
                        <h2 className={cart.price}>${price}</h2>
                        <div className={cart.containerButtons}>
                            <button
                                id={props.count > 1 ? cart.buttonLess : undefined}
                                onClick={() => {
                                    accountantLess();
                                    addLocaStorageLess()
                                }}
                            >-</button>

                            <button style={{ borderColor: "transparent", backgroundColor: "transparent" }}>{props.count}</button>
                            <button
                                onClick={() => {
                                    addLocaStorageMore()
                                    accountantMore();
                                }}
                            >+</button>
                            <button className={cart.delete}
                                onClick={() => {
                                    eliminateProduct();
                                    deleteLocaStorageLess();
                                    deletePro();
                                }}
                            >Eliminar</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ShoppingCard
