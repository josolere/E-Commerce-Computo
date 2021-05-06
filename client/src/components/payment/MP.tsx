import React, { FC, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { setCommentRange } from 'typescript';
import { MERCADO_PAGO, CURRENT_ORDER } from "../../gql/mercadopago";
import { gql, useMutation, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { ACTUAL_USER } from '../../gql/loginGql';
import {
  faEnvelopeSquare, faPassport, faLock,
  faAddressBook, faSignature, faCalendar,
  faCreditCard, faUniversity, faMoneyCheck,
  faMoneyBill, faCalculator, faCashRegister
}
  from '@fortawesome/free-solid-svg-icons';
import styles from './Payment.module.scss';
import styles2 from './MercadoV2.module.scss';
import Logo from '../images/MercadoPago.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles4 from './Responsive.module.scss';
import { toast, ToastContainer } from "react-toastify"

import { NEW_ORDER, NEW_ORDER_DETAIL } from "../../gql/shopingCartGql"
import {GET_ORDER_BY_STATUS } from "../../gql/ordersGql"

declare global {
  interface Window {
    MercadoPago: any  //v2
  }
}

interface Props { }

interface PropsMercado {
  location: {
    search: string
  }
  history: {
    location: {
      state: {
        price: string
      }
    }
  }
}

/**
* @author 
* @function MP
**/

const MP: FC<PropsMercado> = (props) => {

  const [disabled , setDisabled ] = useState(false)
  const [hidden , setHidden ] = useState(true)

  const user = useQuery(ACTUAL_USER)

  const price = props.history.location.state.price

  let claveAndres = 'TEST-f76736fb-f8c7-4bb1-a19e-ab2ab45eb887'

  const mp = new window.MercadoPago(claveAndres, { locale: 'es-AR' })

  let idUser = user?.data?.currentUser?.id

  let order = useQuery(CURRENT_ORDER, { variables: { idUser: idUser, status: 'pendiente' } })

  let idOrder = order?.data?.getOrderByStatus[0]?.id

  const [processPayment, results] = useMutation(MERCADO_PAGO);

  let priceTotal = useSelector((store: AppState) => store.shoppingCartReducer.priceSubTotal).toString()

  priceTotal = priceTotal.toString()

  const [timer, setTimer] = useState(false)


  const [createOrder] = useMutation(NEW_ORDER)

  const [createOrderDetail] = useMutation(NEW_ORDER_DETAIL,{
    refetchQueries:[{query:GET_ORDER_BY_STATUS,variables:{ status: "pendiente", idUser: idUser}}]
})

  useEffect(() => {

    const cardForm = mp.cardForm({

      amount: price,
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

          setDisabled(true)
          setHidden(false);

          const progressBar = document.querySelector(".progress-bar");
          progressBar?.setAttribute("value", "0");

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

          processPayment({
            variables: {
              token,
              issuer_id,
              payment_method_id,
              transaction_amount: Number(amount),
              installments: Number(installments),
              email,
              type: identificationType,
              number: identificationNumber,
              description: "Insumos Computación",
              id: idOrder
            }
          })
            .then((result) => 
            {
                const procesPayment = result?.data?.processPayment;
                if(procesPayment.status===200){
                  // creo una orden nueva para que pueda volbver a comprar
                  createOrder({ variables: { status: "pendiente", idUser: idUser } })
                  .then((resolve) => {
                      //console.log('resolve')
                  })
                  .catch((error) => {
                      //console.log('no responde')
                  })
                  window.location.href = `http://localhost:3000/PostPago?id=${result?.data?.processPayment?.payment?.id}`
                }else{
                  toast.error(procesPayment.error.cause.description)
                  progressBar?.removeAttribute("value");
                }
              })
            .catch(error => console.log(error)) // este error entra si el error es del lado del cliente
            .finally(() => {
              //const progressBar = document.querySelector(".progress-bar");
              progressBar?.setAttribute("value", "0");
              progressBar?.removeAttribute("value");
              setDisabled(false);
              setHidden(true);
              })

        },

      },
    });
  }, [])




  return (
    <div className={styles4.back} >
      <div className={styles4.organizar} >
        <div className={styles4.caja} >
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
                  required={true}
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
                  required={true}
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
                  required={true}
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
                  required={true}
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
                  required={true}
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
                  <FontAwesomeIcon icon={faMoneyBill} style={{ color: '#002D62' }} /> ${new Intl.NumberFormat().format(priceTotal)}
                </h1>
              </div>
                <div className={styles.organizarbotones} >
                  <button
                    className={styles.boton}
                    disabled={disabled}
                    type="submit"
                    id="form-checkout__submit">
                    Pagar
                             </button>
                </div>  
              <progress
                value="0"
                hidden={hidden}
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

MP.propTypes = {
  // your expected props
}

MP.defaultProps = {
  // your default props
}
export default MP