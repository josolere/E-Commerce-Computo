import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import NavBar from '../NavBar/NavBar';
import styles from './Payment.module.scss';

/* interface databuy {
  name: string,
  address: {
    id: number | null,
    postalcode: string,
    administrativeArea: string
  },
  subAdministrativeArea: "",
  locality: "",
  street: "",
  premise: "",
  isDefault: boolean | null
} */

interface datastripe {
  name: string,
  email: string,
  address: {
    city: string,
    line1: string,
    state: string,
    postal_code: string
  }
}

const StripePay = (): JSX.Element => {

  /*   const [databuy, setdatabuy] = useState<databuy>({
      name: "",
      address: {
        id: null,
        postalcode: "",
        administrativeArea: ""
      },
      subAdministrativeArea: "",
      locality: "",
      street: "",
      premise: "",
      isDefault: null
    }) */

  const [datastripe, setDatastripe] = useState<datastripe>({
    name: '',
    email: '',
    address: {
      city: '',
      line1: '',
      state: '',
      postal_code: ""
    }
  })

  const [namedata, setNamedata] = useState({
    name: "",
  })

  const [emaildata, setEmaildata] = useState({
    email: ""
  })

  const [addressdata, setAddressdata] = useState({
    city: "",
    line1: "",
    state: "",
    postal_code: ""
  })

  const stripe = useStripe()

  const elements = useElements()

  let cardElement: any = { token: "444" }

  const handleinputchange = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.name === 'name') {
      setNamedata({ ...namedata, name: event.currentTarget.value })
    }
    else if (event.currentTarget.name === 'email') {
      setEmaildata({ ...emaildata, email: event.currentTarget.value })
    }
    else if (event.currentTarget.name === 'city') {
      setAddressdata({ ...addressdata, city: event.currentTarget.value })
    }
    else if (event.currentTarget.name === 'line1') {
      setAddressdata({ ...addressdata, line1: event.currentTarget.value })
    }
    else if (event.currentTarget.name === 'postal_code') {
      setAddressdata({ ...addressdata, postal_code: event.currentTarget.value })
    }
    else if (event.currentTarget.name === 'state') {
      setAddressdata({ ...addressdata, state: event.currentTarget.value })
    }
    setDatastripe({
      name: namedata.name, email: emaildata.email,
      address: { postal_code: addressdata.postal_code, city: addressdata.city, state: addressdata.state, line1: addressdata.line1 }
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()

    if (!stripe || !elements) {
      return;
    } else {
      cardElement = elements?.getElement(CardElement);
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: datastripe
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }

  };

  console.log(datastripe)

  return (
    <React.Fragment>
      <div className={styles.back} >
      
        <div className={styles.organizar} >
          <div className={styles.caja} >
            <h4>Precio</h4>
            <h4>Detalles de la compra</h4>
            <form onSubmit={handleSubmit}  >
              <div className={styles.form__group}>
                <label htmlFor='name' className={styles.form__label} >Nombre</label>
                <input
                  onChange={handleinputchange}
                  className={styles.form__field}
                  name='name'
                  type='text'
                  required={true}
                  placeholder='Nombre completo'
                  minLength={5}
                  maxLength={20}
                />
              </div>
              <div className={styles.form__group}>
                <label htmlFor='email' className={styles.form__label}  >E-Mail</label>
                <input
                  onChange={handleinputchange}
                  className={styles.form__field}
                  name='email'
                  type='email'
                  required={true}
                  placeholder='E-Mail'
                  minLength={10}
                  maxLength={30}
                />
              </div>
              <div className={styles.form__group}>
                <label htmlFor='address' className={styles.form__label}  >Dirección</label>
                <input
                  onChange={handleinputchange}
                  className={styles.form__field}
                  name='line1'
                  type='text'
                  required={true}
                  placeholder='Direccion'
                  minLength={5}
                  maxLength={40}
                />
              </div>
              <div className={styles.form__group}>
                <label htmlFor='city' className={styles.form__label}  >Ciudad</label>
                <input
                  onChange={handleinputchange}
                  className={styles.form__field}
                  name='city'
                  type='text'
                  required={true}
                  placeholder='Ciudad'
                  maxLength={20}
                />
              </div>
              <div className={styles.form__group}>
                <label htmlFor='state' className={styles.form__label}  >Estado</label>
                <input
                  onChange={handleinputchange}
                  className={styles.form__field}
                  name='state'
                  type='text'
                  required={true}
                  placeholder='Estado / Provincia'
                  maxLength={20}
                />
              </div>
              <div className={styles.form__group}>
                <label htmlFor='zip' className={styles.form__label}  >Codigo Postal</label>
                <input
                  onChange={handleinputchange}
                  className={styles.form__field}
                  name='postal_code'
                  type='text'
                  required={true}
                  placeholder='Codigo Postal / ZIP'
                  minLength={3}
                  maxLength={5}
                />
              </div>
              <CardElement className={styles.tarjeta} />
              <div className={styles.organizarbotones} >
                <button className={styles.boton} type='submit' disabled={!stripe} >Comprar</button>
              </div>
            </form>
          </div>
        </div >
      </div >
    </React.Fragment >
  )
}

export default StripePay