import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import NavBar from '../NavBar/NavBar'
import { useMutation, gql, useQuery } from '@apollo/client';
import { GET_ORDER_BY_StATUS } from "../../gql/orders"
import { LOGIN_MUTATION, SIGNUP_MUTATION, ACTUAL_USER } from "../../gql/login"
import { NEW_ORDER, NEW_ORDER_DETAIL, GET_ORDER } from "../../gql/shopingCart"
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../redux/reducers';
import { addLocalStorage, logeo, orderId, addBaseDeDatos } from '../../redux/actions'
import { FILTER } from "../../gql/card"



const Home = () => {

    const dispatch = useDispatch()

    const { logeo, idOrder, idUsers }: any = useSelector((store: AppState) => store.shoppingCartReducer)
    console.log(idUsers)

    const actualUser = useQuery(ACTUAL_USER)
    
    let idUser = actualUser?.data?.currentUser?.id

    const dataOrderSatus: any = useQuery(GET_ORDER_BY_StATUS, {
        variables: { status: "pendiente", idUser: idUser }
    })

    const [createOrderDetail] = useMutation(NEW_ORDER_DETAIL, {
        refetchQueries: [{ query: GET_ORDER_BY_StATUS, variables: { status: "pendiente", idUser: idUser } }, { query: ACTUAL_USER }]
    })

    const [createOrder] = useMutation(NEW_ORDER, {
        refetchQueries: [{ query: GET_ORDER_BY_StATUS, variables: { status: "pendiente", idUser: idUser } }, { query: ACTUAL_USER }]
    })


    useEffect(() => {
        console.log(idUser)
        console.log(dataOrderSatus?.data)

        if (actualUser?.data?.currentUser?.googleId && !dataOrderSatus?.data?.id && idUser !== undefined) {
            console.log(actualUser?.data?.currentUser?.googleId)

            createOrder({ variables: { status: "pendiente", idUser: idUser } })
                .then((resolve) => {
                    console.log('resolve')
                    const resolveIdOrder = resolve.data.createOrder.id
                    dispatch(orderId(resolveIdOrder))

                    if (localStorage.getItem('productsLocal')) {
                        let productLocal: any = []
                        console.log(resolveIdOrder)
                        productLocal = (localStorage.getItem('productsLocal'))
                        productLocal = (JSON.parse(productLocal))
                        console.log(productLocal)

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
            console.log('entra else')
            if (localStorage.getItem('productsLocal')) {
                console.log('idOrder')
                let productLocals: any = []
                productLocals = (localStorage.getItem('productsLocal'))
                productLocals = (JSON.parse(productLocals))
                dispatch(orderId(idOrder))
                productLocals.map((mapeo: any) => {
                    createOrderDetail({ variables: { idOrder: dataOrderSatus?.data?.id, idProduct: mapeo.id, quantity: mapeo.count } })
                        .then((resolve) => {
                            console.log(resolve)
                        })
                        .catch((error) => {
                            console.log('no responde')
                        })
                })
            }
        }
       
    }, [dataOrderSatus?.data?.id, idUser])



    return (
        <>
            <NavBar />

        </>
    )
}
export default Home
