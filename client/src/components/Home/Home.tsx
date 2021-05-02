import { useEffect, useRef, useState } from 'react';
import NavBar from '../NavBar/NavBar'
import ResponsiveNav from '../NavBar/ResponsiveNav'


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
             <ResponsiveNav />
       </>
    )
}
export default Home
