import React, { useEffect, useState, useRef } from 'react';
import styles2 from './PostPayment.module.scss';
import { useMutation, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import {
    faEnvelopeSquare, faUnlock, faFileSignature, faMapMarker, faShareAlt, faPassport,
    faAddressBook, faSignature, faCalendar, faCreditCard, faPiggyBank, faUniversity, faMoneyCheck, faCity, faMapMarkedAlt
}
    from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './Payment.module.scss';
import Truck from '../images/Truck.png';

const PostPayment = () => {

    const productos = useSelector((store: AppState) => store.shoppingCartReducer.productTotal)

    console.log(productos)

    return (
        <div className={styles.back} >
            <div className={styles.organizar} >
                <div className={styles.caja} >
                    <div className={styles.sortUp} >
                        <img className={styles.LogoMP} src={Truck} alt='' />
                        <form className={styles.form} >
                            <div className={styles.form__group}>
                                <label className={styles.form__label} htmlFor="email">
                                    <FontAwesomeIcon icon={faEnvelopeSquare} /> E-mail</label>
                                <input
                                    className={styles.form__field}
                                    id="email"
                                    name="email"
                                    type="text"
                                    required={true}
                                />
                            </div>
                            <div className={styles.form__group}>
                                <label className={styles.form__label} htmlFor="email">
                                    <FontAwesomeIcon icon={faMapMarkedAlt} /> Provincia</label>
                                <input
                                    className={styles.form__field}
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
                                    id="email"
                                    name="address"
                                    type="text"
                                    required={true}
                                />
                            </div>
                            <div>
                                <h4>Detalles de los productos</h4>
                                <div>
                                    {productos && productos.map((item: any, index: number) => (
                                        <div>
                                            <p>{item.name}</p>
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