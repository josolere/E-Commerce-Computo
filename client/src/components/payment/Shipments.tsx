import React, { useEffect, useState, useRef } from 'react';
import styles2 from './Shipments.module.scss';
import { useMutation, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import {
    faEnvelopeSquare, faUnlock, faFileSignature, faMapMarker, faShareAlt, faPassport,
    faAddressBook, faSignature, faCalendar, faCreditCard, faPiggyBank, faUniversity, faMoneyCheck, faCity, faMapMarkedAlt, faList
}
    from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './Payment.module.scss';
import Truck from '../images/Truck.png';
import styles3 from './MercadoV2.module.scss'

const PostPayment = () => {

    const productos = useSelector((store: AppState) => store.shoppingCartReducer.productTotal)

    console.log(productos)

    const [shipments, setShipments] = useState({
        state:'',
        city:'',
        address:''
    })

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setShipments({ ...shipments, [event.currentTarget.name]: event.currentTarget.value })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>)  => {
        event.preventDefault()
    }
    return (
        <div className={styles.back} >
            <div className={styles.organizar} >
                <div className={styles.caja} >
                    <div className={styles.sortUp} >
                        <img className={styles.LogoMP} src={Truck} alt='' />
                        <form className={styles.form} >
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
                            <div className={styles.form__group}>
                                <label className={styles.form__label} htmlFor="email">
                                    <FontAwesomeIcon icon={faMapMarkedAlt} /> Provincia</label>
                                <input
                                    className={styles.form__field}
                                    onChange={handleChange}
                                    id="email"
                                    name="State"
                                    type="text"
                                    required={true}
                                />
                            </div>
                            <div className={styles.form__group}>
                                <label className={styles.form__label} htmlFor="email">
                                    <FontAwesomeIcon icon={faCity} /> Ciudad</label>
                                <input
                                    className={styles.form__field}
                                    onChange={handleChange}
                                    id="email"
                                    name="city"
                                    type="text"
                                    required={true}
                                />
                            </div>
                            <div className={styles.form__group}>
                                <label className={styles.form__label} htmlFor="email">
                                    <FontAwesomeIcon icon={faMapMarker} /> Dirección</label>
                                <input
                                    className={styles.form__field}
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
                                            <p className={styles2.PMaped} >
                                            <FontAwesomeIcon icon={faList} style={{marginRight:'2%'}} /> {item.name} X {item.count}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.organizarbotones} >
                                <button
                                    className={styles2.boton}
                                >Confirmar Envió</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostPayment