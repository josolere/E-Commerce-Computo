import React, { useEffect, useState, useRef } from 'react';
import styles2 from './Shipments.module.scss';
import { useMutation, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { faMapMarker, faCity, faMapMarkedAlt, faList} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './Payment.module.scss';
import Truck from '../images/Truck.png';
import styles3 from './MercadoV2.module.scss';
import { Link } from 'react-router-dom';
import {EDIT_ORDER} from '../../gql/mercadopago';
import styles4 from './Responsive.module.scss';

const PostPayment = () => {

    const productos = useSelector((store: AppState) => store.shoppingCartReducer.productTotal)

    let priceTotal = useSelector((store: AppState) => store.shoppingCartReducer.priceSubTotal).toString()

    const [editOrder, dataOrder] = useMutation(EDIT_ORDER)

    const [goToPay, setGoToPay] = useState(true)

    const [shipments, setShipments] = useState({
        state: '',
        city: '',
        address: ''
    })

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setShipments({ ...shipments, [event.currentTarget.name]: event.currentTarget.value })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setGoToPay(false)
        event.preventDefault()
    }

    return (
        <div className={styles4.back} >
            <div className={styles4.organizar} >
                <div className={styles4.caja} >
                    <div className={styles.sortUp} >
                        <img className={styles.LogoMP} src={Truck} alt='' />
                        <form className={styles.form} onSubmit={handleSubmit} >
                            {/*                             <div className={styles.form__group}>
                                <label className={styles.form__label} htmlFor="email">
                                    <FontAwesomeIcon icon={faEnvelopeSquare} /> E-mail</label>
                                <input
                                    className={styles.form__field}
                                    id="email"
                                    name="email"
                                    type="text"
                                    required={true}
                                />
                            </div> */}
                            <div className={styles4.form__group}>
                                <label className={styles4.form__label} htmlFor="email">
                                    <FontAwesomeIcon icon={faMapMarkedAlt} /> Provincia</label>
                                <input
                                    className={styles4.form__field}
                                    onChange={handleChange}
                                    id="email"
                                    name="State"
                                    type="text"
                                    required={true}
                                />
                            </div>
                            <div className={styles4.form__group}>
                                <label className={styles4.form__label} htmlFor="email">
                                    <FontAwesomeIcon icon={faCity} /> Localidad</label>
                                <input
                                    className={styles4.form__field}
                                    onChange={handleChange}
                                    id="email"
                                    name="city"
                                    type="text"
                                    required={true}
                                />
                            </div>
                            <div className={styles4.form__group}>
                                <label className={styles4.form__label} htmlFor="email">
                                    <FontAwesomeIcon icon={faMapMarker} /> Dirección</label>
                                <input
                                    className={styles4.form__field}
                                    onChange={handleChange}
                                    id="email"
                                    name="address"
                                    type="text"
                                    required={true}
                                />
                            </div>
                            <div className={styles2.sortTotal} >
                                <h1 className={styles3.HTotal} >Detalles de la compra</h1>
                                <div>
                                    {productos && productos.map((item: any, index: number) => (
                                        <div className={styles2.SortMapShip} >
                                            <p key={index} className={styles2.PMaped} >
                                                <FontAwesomeIcon icon={faList} style={{ marginRight: '2%' }} /> {item.name} X {item.count}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {goToPay ?
                            <div className={styles4.organizarbotones} >
                                    <button
                                        type='submit'
                                        className={styles2.boton}
                                    >Confirmar Envió</button>
                            </div>
                            :
                            <div className={styles4.organizarbotones} >
                            <Link to={{
                                pathname: '/Mercado',
                                state: {
                                    price: priceTotal,
                                }
                            }}>
                                <button
                                    className={styles2.boton}
                                >Continuar</button>
                            </Link>
                        </div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostPayment