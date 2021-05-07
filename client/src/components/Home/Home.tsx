import { useEffect, useRef, useState} from 'react';
import NavBar from '../NavBar/NavBar'
import { useMutation, useQuery } from '@apollo/client';
import { GET_ORDER_BY_STATUS, GET_ALL_ORDERS } from "../../gql/ordersGql"
import { ACTUAL_USER } from "../../gql/loginGql"
import { NEW_ORDER, NEW_ORDER_DETAIL } from "../../gql/shopingCartGql"
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../redux/reducers';
import {  orderId } from '../../redux/actions'
import NavBarResponsive from '../NavBar/ResponsiveNav';

const Home = () => {
    const firsstRender = useRef(true)
    const dispatch = useDispatch()
    const allOrders = useQuery(GET_ALL_ORDERS, {
        variables: { status: "pendiente" }
    })


    const { logeo, idOrder, idUsers }: any = useSelector((store: AppState) => store.shoppingCartReducer)

    const actualUser = useQuery(ACTUAL_USER)
    const [user, setUser] = useState('')
    const [createOrder] = useMutation(NEW_ORDER, {
        refetchQueries: [{ query: GET_ORDER_BY_STATUS, variables: { status: "pendiente", idUser: user } }, { query: ACTUAL_USER }]
    })

    const [createOrderDetail] = useMutation(NEW_ORDER_DETAIL, {
        refetchQueries: [{ query: GET_ORDER_BY_STATUS, variables: { status: "pendiente", idUser: user } }, { query: ACTUAL_USER }]
    })

    const dataOrderSatus: any = useQuery(GET_ORDER_BY_STATUS, {
        variables: { status: "pendiente", idUser: user }
    })

    const [orders, setOrders] = useState([])

    useEffect(() => {
        if (firsstRender.current) {
            firsstRender.current = false;
        } else {
            setUser(actualUser?.data?.currentUser?.id)
        }

    }, [actualUser])

    useEffect(() => {
        if (firsstRender.current) {
            firsstRender.current = false;
        } else {
            setOrders(dataOrderSatus?.data)
        }
    }, [dataOrderSatus])

    useEffect(() => {
        if (firsstRender.current) {
            firsstRender.current = false;
        } else {
            if (allOrders?.data?.getAllOrders) {
                let arrayOrders = allOrders?.data?.getAllOrders
                let arrarNewOrders = arrayOrders?.filter((filt: any) => filt.UserId === user)
                let idUser = actualUser?.data?.currentUser?.googleId
                if (arrarNewOrders.length === 0 && idUser) {
                    createOrder({ variables: { status: "pendiente", idUser: user } })
                        .then((resolve) => {
                            console.log('resolve')
                            const resolveIdOrder = resolve.data.createOrder.id
                            dispatch(orderId(resolveIdOrder))
                            if (localStorage.getItem('productsLocal')) {
                                let productLocal: any = []
                                productLocal = (localStorage.getItem('productsLocal'))
                                productLocal = (JSON.parse(productLocal))
                                productLocal.map((mapeo: any) => {
                                    createOrderDetail({ variables: { idOrder: resolveIdOrder, idProduct: mapeo.id, quantity: mapeo.count } })
                                        .then((resolve) => {
                                            console.log(resolve)
                                        })
                                        .catch((error) => {
                                            console.log('no responde')
                                        })
                                })
                            }
                        })
                        .catch((error) => {
                            console.log('no responde')
                        })
                } else {
                    if (localStorage.getItem('productsLocal')) {
                        let productLocals: any = []
                        productLocals = (localStorage.getItem('productsLocal'))
                        productLocals = (JSON.parse(productLocals))
                        dispatch(orderId(idOrder))
                        productLocals.map((mapeo: any) => {
                            createOrderDetail({ variables: { idOrder: arrarNewOrders[0]?.id, idProduct: mapeo.id, quantity: mapeo.count } })
                                .then((resolve) => {
                                    console.log(resolve)
                                })
                                .catch((error) => {
                                    console.log('no responde')
                                })
                        })
                    }
                }
            }
        }
    }, [allOrders])

    return (
        <>
        <NavBarResponsive/>
        <NavBar/>
        </>
    )
}
export default Home
