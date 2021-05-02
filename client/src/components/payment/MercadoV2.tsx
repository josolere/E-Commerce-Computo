import React, { useEffect, useState, useRef } from 'react';
import styles from './Payment.module.scss';
import { useMutation, useQuery } from '@apollo/client';
import Logo from '../images/MercadoPago.png';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import {
    faEnvelopeSquare, faPassport, faLock,
    faAddressBook, faSignature, faCalendar,
    faCreditCard, faUniversity, faMoneyCheck,
    faMoneyBill, faCalculator, faCashRegister
}
    from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MERCADO_PAGO } from "../../gql/Payment";
import { Cookies } from 'react-cookie'
import styles2 from './MercadoV2.module.scss'

declare global {
    interface Window {
        MercadoPago: any;
    }
}

const Mercado = () => {

    const mp = new window.MercadoPago('TEST-f76736fb-f8c7-4bb1-a19e-ab2ab45eb887', { locale: 'es-AR' })

    let priceTotal = useSelector((store: AppState) => store.shoppingCartReducer.priceSubTotal)

    const [processPayment, results] = useMutation(MERCADO_PAGO);

    priceTotal = priceTotal.toString()

    useEffect (() => {

    const cardForm = mp.cardForm({
        amount: "100.5",
        autoMount: true,
        form: {
          id: "form-checkout",
          cardholderName: {
            id: "form-checkout__cardholderName",
            placeholder: "Titular de la tarjeta",
          },
          cardholderEmail: {
            id: "form-checkout__cardholderEmail",
            placeholder: "E-mail",
          },
          cardNumber: {
            id: "form-checkout__cardNumber",
            placeholder: "Número de la tarjeta",
          },
          cardExpirationMonth: {
            id: "form-checkout__cardExpirationMonth",
            placeholder: "Mes de vencimiento",
          },
          cardExpirationYear: {
            id: "form-checkout__cardExpirationYear",
            placeholder: "Año de vencimiento",
          },
          securityCode: {
            id: "form-checkout__securityCode",
            placeholder: "Código de seguridad",
          },
          installments: {
            id: "form-checkout__installments",
            placeholder: "Cuotas",
          },
          identificationType: {
            id: "form-checkout__identificationType",
            placeholder: "Tipo de documento",
          },
          identificationNumber: {
            id: "form-checkout__identificationNumber",
            placeholder: "Número de documento",
          },
          issuer: {
            id: "form-checkout__issuer",
            placeholder: "Banco emisor",
          },
        },
        callbacks: {

          onFormMounted: (error: any) => {
            if (error) return console.warn("Form Mounted handling error: ", error);
            console.log("Form mounted");
          },
          onSubmit: (event: { preventDefault: () => void; }) => {
            event.preventDefault();

            const {
                paymentMethodId: payment_method_id,
                issuerId: issuer_id,
                cardholderEmail: email,
                amount,
                token,
                installments,
                identificationNumber,
                identificationType,
              } = cardForm.getCardFormData();
        
/*
              console.log(payment_method_id)
              console.log("issuerId", issuer_id)
              console.log("cardholderEmail", email)
              console.log("amount", amount)
              console.log("Token",token)
              console.log("installments",installments)
              console.log("identificationNumber",identificationNumber)
              console.log("identificationType",identificationType)
              */
              processPayment({ variables: { 
                                            token,
                                            issuer_id,
                                            payment_method_id,
                                            transaction_amount : Number(amount), 
                                            installments: Number(installments),
                                            email,
                                            type:identificationType,
                                            number:identificationNumber,
                                            description:"algun texto" 
                                            } 
                                     })
                                    .then(result => console.log(result?.data))
                                     .catch(error => console.log(error)) // este error entra si el error es del lado del cliente
                                     .finally(() => console.log('termine'))
            
/*

            console.log(payment_method_id)
            console.log("issuerId", issuer_id)
            console.log("cardholderEmail", email)
            console.log("amount", amount)
            console.log("Token",token)
            console.log("installments",installments)
            console.log("identificationNumber",identificationNumber)
            console.log("identificationType",identificationType)


            fetch("/process_payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token,
                issuer_id,
                payment_method_id,
                transaction_amount: Number(amount),
                installments: Number(installments),
                description: "Descripción del producto",
                payer: {
                  email,
                  identification: {
                    type: identificationType,
                    number: identificationNumber,
                  },
                },
              }),
            });

            */
          },

          /*
          onFetching: (resource: any) => {
            console.log("Fetching resource: ", resource);
      
            // Animate progress bar
            const progressBar = document.querySelector(".progress-bar");
            progressBar?.removeAttribute("value");
      
            return () => {
              progressBar?.setAttribute("value", "0");
            };
                     
          },
 */


        },
       
      });


  

    }, [])

    return (
        <div className={styles.back} >
            <div className={styles.organizar} >
                <div className={styles.caja} >
                    <div className={styles.sortUp} >
                        <img className={styles.LogoMP} src={Logo} alt='' />
                        <form id="form-checkout" className={styles.form} >
                            <div className={styles.form__group} >
                                <label className={styles.form__label} >
                                    <FontAwesomeIcon icon={faCreditCard} /> Numero de Tarjeta</label>
                                <input
                                    className={styles.form__field}
                                    type="text"
                                    name="cardNumber"
                                    minLength={16}
                                    maxLength={16}
                                    id="form-checkout__cardNumber"
                                />
                            </div>
                            <div className={styles2.MoYe} >
                                    <label className={styles2.form__labelM} >
                                        <FontAwesomeIcon icon={faCalendar} /> Mes</label>
                                    <input
                                        className={styles2.form__field__Month}
                                        type="text"
                                        minLength={2}
                                        maxLength={2}
                                        name="cardExpirationMonth"
                                        id="form-checkout__cardExpirationMonth"
                                    />
                                    <label className={styles2.form__labelY} >
                                        <FontAwesomeIcon icon={faCalendar} /> Año</label>
                                    <input
                                        className={styles2.form__field__Month}
                                        type="text"
                                        minLength={2}
                                        maxLength={2}
                                        name="cardExpirationYear"
                                        id="form-checkout__cardExpirationYear"
                                    />
                            </div>
                            <div className={styles.form__group} >
                                <label className={styles.form__label} >
                                    <FontAwesomeIcon icon={faSignature} /> Nombre del Titular</label>
                                <input
                                    className={styles.form__field}
                                    type="text"
                                    name="cardholderName"
                                    id="form-checkout__cardholderName"
                                />
                            </div>
                            <div className={styles.form__group} >
                                <label className={styles.form__label} >
                                    <FontAwesomeIcon icon={faEnvelopeSquare} /> E-Mail del Titular</label>
                                <input
                                    className={styles.form__field}
                                    type="email"
                                    name="cardholderEmail"
                                    id="form-checkout__cardholderEmail"
                                />
                            </div>
                            <div className={styles.form__group}>
                                <label className={styles.form__label} >
                                    <FontAwesomeIcon icon={faLock} /> Codigo de Seguridad</label>
                                <input
                                    className={styles.form__field}
                                    type="text"
                                    minLength={3}
                                    maxLength={3}
                                    name="securityCode"
                                    id="form-checkout__securityCode"
                                />
                            </div>
                            <div className={styles.sortBox} >
                                <label htmlFor="docType"
                                    className={styles.labelSelect}
                                >
                                    <FontAwesomeIcon icon={faUniversity} /> Banco Emisor</label>
                                <div className={styles.box} >
                                    <select
                                        name="issuer"
                                        id="form-checkout__issuer">
                                    </select>
                                </div>
                            </div>
                            <div className={styles2.sortBoxBE} >
                                <label htmlFor="docType"
                                    className={styles.labelSelect}
                                >
                                    <FontAwesomeIcon icon={faPassport} /> Tipo de documento</label>
                                <div className={styles.box} >
                                    <select
                                        name="identificationType"
                                        id="form-checkout__identificationType">
                                    </select>
                                </div>
                            </div>
                            <div className={styles.form__group}>
                                <label className={styles.form__label} >
                                    <FontAwesomeIcon icon={faAddressBook} /> Número de Documento</label>
                                <input
                                    className={styles.form__field}
                                    type="text"
                                    minLength={8}
                                    maxLength={8}
                                    name="identificationNumber"
                                    id="form-checkout__identificationNumber"
                                />
                            </div>
                            <div className={styles.sortBox} >
                                <label htmlFor="docType"
                                    className={styles.labelSelect}
                                >
                                    <FontAwesomeIcon icon={faMoneyCheck} /> Cuotas</label>
                                <div className={styles.box}>
                                    <select
                                        name="installments"
                                        id="form-checkout__installments">
                                    </select>
                                </div>
                            </div>
                            <div className={styles2.sortTotal} >
                                <h1 className={styles2.HTotal} >Total</h1>
                                <h1 className={styles2.PTotal} >
                                    <FontAwesomeIcon icon={faMoneyBill} style={{color:'#002D62'}} /> ${new Intl.NumberFormat().format(priceTotal)}
                                </h1>
                            </div>
                            <div className={styles.organizarbotones} >
                                <button
                                    className={styles.boton}
                                    type="submit"
                                    id="form-checkout__submit">
                                    Pagar
                             </button>
                            </div>
                            <progress
                                value="0"
                                className="progress-bar">
                                Cargando...
                </progress>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

/* MercadoV258.propTypes = {
 */// your expected props
/* }
 */
/* MercadoV258.defaultProps = {
 */// your default props
/* }
 */
export default Mercado
