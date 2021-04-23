/* import SubMenu from "./SubMenu"; */

import styles from './Categories.module.scss'
import { useQuery, gql, useMutation } from '@apollo/client';
import { useDispatch, useSelector } from "react-redux";
import { setCategory, deleteCart } from "../../redux/actions";
import { GET_CATEGORIES } from "../../gql/categories"
import Cards from '../Cards/CardsHome';
import { useState, useRef, useEffect } from 'react';
import { NEW_ORDER, NEW_ORDER_DETAIL, GET_ORDER } from "../../gql/shopingCart"
import { AppState } from '../../redux/reducers';



export interface model {
  id: number;
  name: string
}

interface DetailsData {
  getCategory: model[]
}

const NavCategories = (): JSX.Element => {



  const { loading, error, data } = useQuery<DetailsData>(GET_CATEGORIES)


  const categories = data?.getCategory

  const reset = 0
  const dispatch = useDispatch()

  const filterCategories = (e: any) => {
    dispatch(setCategory([e.target.value]))
  }

  //-----------------------------------------------------------------------------------------------
  const [createOrder] = useMutation(NEW_ORDER)
  const [createOrderDetail] = useMutation(NEW_ORDER_DETAIL)
  const { logeo, idUsers }: any = useSelector((store: AppState) => store.shoppingCartReducer)


  const [logeos, setLogeos] = useState()
  const [idOrder, setIdOrder] = useState(0)
  const [order, setOrder] = useState([])
  const [statusOrder, setStatusOrder] = useState([])
  const [idUser, setIdUser] = useState( "c97f0885-7519-44a5-83db-e49fa6922cab")


  useEffect(() => {
    if (localStorage.getItem('productsLocal')) {
      let log:any = false
      log = (localStorage.getItem('logeo'))
      log = (JSON.parse(log))
      setLogeos(log)
    }
  }, [])
  console.log(logeos)
 

  const getOrder = useQuery(GET_ORDER, {
    variables: { idUser: idUser }
  });
  const getOrderData = getOrder.data?.getOrdersByIdUser

  console.log(getOrderData)
  console.log(getOrder?.data ===true)


  useEffect(() => {

    if ( logeos === true) {
      if (getOrderData.length === 0) {
        createOrder({ variables: { status: "pendiente", idUser:idUser } })
          .then((resolve) => {
            const resolveIdOrder = resolve.data.createOrder.id
            if (localStorage.getItem('productsLocal')) {
              let productLocal: any = []
              productLocal = (localStorage.getItem('productsLocal'))
              productLocal = (JSON.parse(productLocal))
              productLocal.map((mapeo: any) => {
                createOrderDetail({ variables: { idOrder: resolveIdOrder, idProduct: mapeo.id, quantity: mapeo.count } })
                  .then((resolve) => {
                    localStorage.clear()
                    dispatch(deleteCart())
                    console.log(resolve)
                  })
                  .catch((error) => {
                    console.log('no responde')
                  })
              })
            }
          })
      } else {
        if (localStorage.getItem('productsLocal')) {
          const newArray = getOrderData.filter((filt: any) => filt.status === 'pendiente')
          newArray.length > 0 && setIdOrder(newArray[0].id)
          let productLocals: any = []
          productLocals = (localStorage.getItem('productsLocal'))
          productLocals = (JSON.parse(productLocals))
          console.log(idOrder)
          productLocals.map((mapeo: any) => {
            createOrderDetail({ variables: { idOrder: idOrder, idProduct: mapeo.id, quantity: mapeo.count } })
              .then((resolve) => {
                localStorage.clear()
                dispatch(deleteCart())
                console.log(resolve)
              })
              .catch((error) => {
                console.log('no responde')
              })
          })
        }
      }
    }

  }, [getOrder, idOrder])


  //------------------------------------------------------------------------------------------------
  return (
    <>
      <div className={styles.container} >
        <button className={styles.todos} onClick={(e) => dispatch(setCategory([]))}>Todos</button>
        {categories?.map((item: model, i: number) => {
          return <button onClick={e => filterCategories(e)} value={item.id}
            className={styles.containerCategories}>{item.name}</button>;
        })}
      </div>
      <Cards reset={reset} />
    </>
  );
};

export default NavCategories;




/* const categorias: model[] = [
    {
      title: "Placa de Video",
      subNav: [
        { title: "Placas de video Amd", id : 1 },
        { title: "Placas de video GeForce", id : 2 },
      ],
    },
    {
      title: "Memorias",
      subNav: [{ title: "Memorias Ram", id: 3}, { title: "Memorias Sodimm", id : 4 }],
    },
    {
      title: "Almacenamiento",
      subNav: [{ title: "Disco SSD", id:5 }, { title: "Disco Rigido", id : 6 }],
    },
    {
      title: "Motherboards",
      subNav: [{ title: "Mothers AMD", id : 7 }, { title: "Mothers Intel", id : 8 }],
    },
    {
      title: "Teclados y Mouses",
      subNav: [
        { title: "Mouses", id:9 },
        { title: "Teclados", id:10 },
        { title: "Mouse Pads", id:11 },
      ],
    },
    {
      title: "Monitores y Televisores",
      subNav: [{ title: "Soportes", id:12 }, { title: "Monitores y pantallas", id:13 }],
    },
    {
      title: "Perifericos",
      subNav: [{ title: "Webcam", id:14 },{ title: "Auriculares", id:15 }, { title: "Tablas Digitalizadoras", id:16 }],
    },
    {
      title: "Procesadores",
      subNav: [
        { title: "Procesadores Amd", id : 17 },
        { title: "Procesadores Intel", id : 18 },
      ],
    },
  ];
 */