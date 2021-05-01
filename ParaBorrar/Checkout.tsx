import React, { useEffect, useState, useRef } from 'react';
import styles from './Payment.module.scss';
import { useMutation, useQuery } from '@apollo/client';
import Logo from '../images/MercadoPago.png';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/reducers';
import {
    faEnvelopeSquare, faPassport,
    faAddressBook, faSignature, faCalendar,
    faCreditCard, faUniversity, faMoneyCheck,
    faMoneyBill,
    faCalculator,
    faCashRegister
}
    from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MERCADO_PAGO } from "../../../gql/Payment";
import styles2 from './Checkout.module.scss'


const Checkout = () => {

    let products = useSelector((store: AppState) => store.shoppingCartReducer.productTotal)

    const priceTotal = useSelector((store: AppState) => store.shoppingCartReducer.priceSubTotal)

    let productsToSaleName: Array<any> = [];

    let productsToSalePrice: Array<any> = [];

    let productsToSaleCount: Array<any> = [];

    let count = 0

    while (count < products.length) {
        productsToSaleName.push(products[count].name);
        productsToSalePrice.push(products[count].price);
        productsToSaleCount.push(products[count].Count);
        count++;
    }

    console.log(productsToSaleName)

    return (
        <div className={styles.back} >
            <div className={styles.organizar} >
                <div className={styles.caja} >
                    <div className={styles.sortUp} >
                        <img className={styles.LogoMP} src={Logo} alt='' />
                        <form  >
                            <div className={styles2.sortCheck}>
                                <h4 className={styles2.titlesCheck} >Detalles de la compra</h4>
                                <div>
                                    {products && products.map((item: any, index: number) => (
                                        <div>
                                            <p key={index + 10} >
                                                <FontAwesomeIcon icon={faSignature} /> Nombre: {item.name}</p>
                                            <p key={index + 20} >
                                                <FontAwesomeIcon icon={faMoneyBill} /> Precio: ${new Intl.NumberFormat().format(item.price)}</p>
                                            <p key={index + 30} >
                                                <FontAwesomeIcon icon={faCalculator} /> Cantidad: {item.count}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles2.sortTotal}>
                                    <h4>Total:  </h4>
                                    <p>
                                        <FontAwesomeIcon icon={faMoneyBill} /> ${new Intl.NumberFormat().format(priceTotal)}
                                    </p>
                                </div>
                                <div className={styles.organizarbotones} >
                                    <button
                                        className={styles.boton}
                                    >
                                        <FontAwesomeIcon style={{ marginRight: '5%' }} icon={faCashRegister} /> Comprar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout