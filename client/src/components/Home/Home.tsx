import { useEffect, useRef, useState } from 'react';
import NavBar from '../NavBar/NavBar'
<<<<<<< HEAD
import ResponsiveNav from '../NavBar/ResponsiveNav'
=======
import { useMutation, gql, useQuery } from '@apollo/client';
import { GET_ORDER_BY_StATUS } from "../../gql/orders"
import { LOGIN_MUTATION, SIGNUP_MUTATION, ACTUAL_USER } from "../../gql/login"
import { NEW_ORDER, NEW_ORDER_DETAIL, GET_ORDER } from "../../gql/shopingCart"
import { useDispatch, useSelector } from 'react-redux'
import { AppState} from '../../redux/reducers';
import { addLocalStorage, logeo, orderId, addBaseDeDatos } from '../../redux/actions/index'
import { FILTER } from "../../gql/card"



>>>>>>> 304f3d7bb78d8792793a8768bf2ef4ddc0dee6a6


const Home = () => {
//   const dispatch = useDispatch()

//   const name = useSelector((store: AppState) => store.productReducer.filter)
//     const categoriesId = useSelector((store: AppState) => Number(store.productReducer.categories) || [])


//     const firsstRender = useRef(true)
//     const [createOrders, setCreateOrders] = useState(false)
//     const [orderCount, setOrderCount] = useState([])

//     const { logeo } = useSelector((store: AppState) => store.shoppingCartReducer)


//     const idUserCurrent = useQuery(ACTUAL_USER);
//     const idUser = idUserCurrent?.data?.currentUser?.id

//     const [createOrderDetail] = useMutation(NEW_ORDER_DETAIL, {
//         refetchQueries: [{ query: GET_ORDER_BY_StATUS, variables: { status: "pendiente", idUser: idUser }}]
//     })
    
    
//     const [createOrder] = useMutation(NEW_ORDER)


//     const { data } = useQuery(GET_ORDER, {
//         variables: { idUser: idUser }
//     });

//     useEffect(() => {
//         if (data) {
//             setOrderCount(data.getOrdersByIdUser)
//         }
//     }, [data])
//     console.log(idUser)

//     useEffect(() => {
//         console.log('home')

//         console.log(idUser)
//         if (firsstRender.current) {
//             firsstRender.current = false;
//         } else {
//             if (logeo === true && data) {
//                 const newArray: any = orderCount.filter((filt: any) => filt.status === 'pendiente')
//                 console.log(newArray.length)
//                 if (newArray.length === 0) {
//                     createOrder({ variables: { status: "pendiente", idUser: idUser } })
//                         .then((resolve) => {
//                             console.log('resolve')
//                             const resolveIdOrder = resolve.data.createOrder.id
//                             dispatch(orderId(resolveIdOrder))

//                             if (localStorage.getItem('productsLocal')) {
//                                 let productLocal: any = []
//                                 console.log(resolveIdOrder)
//                                 productLocal = (localStorage.getItem('productsLocal'))
//                                 productLocal = (JSON.parse(productLocal))
//                                 console.log(productLocal)

//                                 productLocal.map((mapeo: any) => {
//                                     createOrderDetail({ variables: { idOrder: resolveIdOrder, idProduct: mapeo.id, quantity: mapeo.count } })
//                                         .then((resolve) => {
//                                             console.log(resolve)
//                                         })
//                                         .catch((error) => {
//                                             console.log('no responde')
//                                         })
//                                 })
//                             }
//                         })
//                         .catch((error) => {
//                             console.log('no responde')
//                         })
//                 } else {
//                     console.log('entra else')
//                     if (localStorage.getItem('productsLocal')) {
//                         console.log('entra')
//                         const newArrayUSer: any = orderCount.filter((filt: any) => filt.status === 'pendiente')
//                         if (newArrayUSer.length > 0) {
//                             console.log('idOrder')
//                             let idOrder = (newArrayUSer[0].id)
//                             let productLocals: any = []
//                             productLocals = (localStorage.getItem('productsLocal'))
//                             productLocals = (JSON.parse(productLocals))
//                             dispatch(orderId(idOrder))

//                             productLocals.map((mapeo: any) => {
//                                 createOrderDetail({ variables: { idOrder: idOrder, idProduct: mapeo.id, quantity: mapeo.count } })
//                                     .then((resolve) => {
//                                         console.log(resolve)
//                                     })
//                                     .catch((error) => {
//                                         console.log('no responde')
//                                     })
//                             })
//                         }
//                     }
//                 }
//             }
//         }
//         setCreateOrders(true)

//     }, [orderCount, idUserCurrent])


  

    return (
        <>
<<<<<<< HEAD
             <ResponsiveNav />
       </>
=======
            <NavBar />

        </>
>>>>>>> 304f3d7bb78d8792793a8768bf2ef4ddc0dee6a6
    )
}
export default Home
