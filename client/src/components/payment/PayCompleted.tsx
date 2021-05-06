import React, { useEffect, useState, useRef } from 'react';
import styles from './Payment.module.scss';
import { useMutation, useQuery } from '@apollo/client';
import Logo from '../images/MercadoPago.png';
import styles2 from './PayCompleted.module.scss'
import { Link } from 'react-router-dom'
import styles4 from './Responsive.module.scss';
import {useDispatch} from 'react-redux';
import { deleteCart } from '../../redux/actions';
import { ACTUAL_USER } from '../../gql/loginGql';
import { MERCADO_PAGO, CURRENT_ORDER } from "../../gql/mercadopago";


interface props {
    location: {
        search: string
    }
}

const PayCompleted = (props: props) => {

    const search = props.location.search; 

    const params = new URLSearchParams(search);

    const IdFromURL = params.get('id');

    const user = useQuery(ACTUAL_USER)

    let idUser = user?.data?.currentUser?.id

    let order = useQuery(CURRENT_ORDER, {variables:{idUser:idUser, status:'creada'}})
  
    let idOrder = order?.data?.getOrderByStatus[0]?.id

    const dispatch = useDispatch()

    useEffect(() => {
        localStorage.clear()
        dispatch(deleteCart())
    })

    let testLink = '/Orden/Usuario/' + idOrder

    return (
        <div className={styles2.back} >
            <div className={styles2.organizar} >
                <div className={styles2.caja} >
                    <img className={styles2.LogoMP} src={Logo} alt='' />
                    <div className={styles2.ThanksSort}>
                        <h1 className={styles2.Thanks} >Gracias por su compra</h1>
                    </div>
                    <div>
                        <h1 className={styles2.Code} >Codigo de Compra es {IdFromURL}</h1>
                    </div>
                    <div className={styles.organizarbotones} >
                        <Link to='/Ordenes/Usuario'>
                            <button
                                className={styles2.boton}
                            >Ver tus órdenes
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PayCompleted