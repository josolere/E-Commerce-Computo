import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styles from './Payment.module.scss';
import { CREATE_ORDER, EDIT_ORDER } from '../../../gql/orders'
import { useMutation, useQuery } from '@apollo/client';
import { ACTUAL_USER } from '../../../gql/login';
import Logo from '../images/MercadoPago.png';
import {
  isValidNumberOrEmpty,
  formatCreditCardNumber,
  isCardNumberComplete,
  isValidDateOrEmpty,
  isCardExpiryDateValid,
  formatExpiryDate,
  isCvcComplete,
  isValidCvc,
} from '../CreditCard/numberUtils';
import CardInput from '../CreditCard/CardInput';
import CardImage from '../CreditCard/CardImage';
/* import CardType from '../CreditCard/CardType';
 */import styles2 from './CreditCard/CreditCard.module.scss';

const ExpiryDateInputName = 'expiry-date';
const CardNumberInputName = 'card-number';
const CvcInputName = 'cvc';

declare global {
  interface Window {
    Mercadopago: any;
    mp: any
  }
}




type SelectEvent = React.FormEvent<HTMLSelectElement>;

const Mercado = (): JSX.Element => {


  useEffect(() => {
   console.log(window.Mercadopago.getIdentificationTypes());
    console.log(window.Mercadopago)
  })

  let user: any = {}

  const { loading, error, data } = useQuery(ACTUAL_USER)

  user = data?.currentUser

  const [inputWithFocus, setInputWithFocus] = React.useState<string>('');

  const [expiryDateError, setExpiryDateError] = React.useState<string>('');

/*   const [cardType, setCardType] = React.useState<CardType>(CardType.Generic);
 */
  const [createOrder, results] = useMutation(CREATE_ORDER);

  const [editOrder, resuult] = useMutation(EDIT_ORDER);

  const [creditCardNum, setCreditCardNum] = useState('')

  const [creditCardCVC, setCreditCardCVC] = useState('')

  const [creditCardMonth, setCreditCardMonth] = useState('')

  const [creditCardYear, setCreditCardYear] = useState('')

  const [mail, setMail] = useState('')

  const [name, setName] = useState('')

  const [typeDocument, setTypeDocument] = useState('')

  const [document, setDocument] = useState('')

  const [bank, setBank] = useState('')

  const [quota, setQuota] = useState('')


  const nameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }

  const emailChange = (e: React.FormEvent<HTMLInputElement>) => {
    setMail(e.currentTarget.value)
  }

  const documentChange = (e: React.FormEvent<HTMLInputElement>) => {
    setDocument(e.currentTarget.value)
  }

  const typedocChange = (e: SelectEvent) => {
    setTypeDocument(e.currentTarget.value)
  }

  const banckChange = (e: SelectEvent) => {
    setBank(e.currentTarget.value)
  }

  const quotaChange = (e: SelectEvent) => {
    setQuota(e.currentTarget.value)
  }

  const gotoNextField = () => {
    switch (inputWithFocus) {
      case CardNumberInputName:
        setInputWithFocus(ExpiryDateInputName)
        break
      case ExpiryDateInputName:
        setInputWithFocus(CvcInputName)
        break
      default:
        setInputWithFocus('')
    }
  }
/* 
  const cardNumberChanged = (cardNumber: string) => {
    setInputWithFocus(CardNumberInputName)
    setCreditCardNum(cardNumber)
    if (cardNumber.startsWith('5')) {
      setCardType(CardType.Master)
    } else if (cardNumber.startsWith('4')) {
      setCardType(CardType.Visa)
    } else setCardType(CardType.Generic)
  }
 */
/*   const cardExpiryDateChanged = (value: string) => {
    setInputWithFocus(ExpiryDateInputName)
    if (value.length === 7 && !isCardExpiryDateValid(value)) {
      setExpiryDateError('Card is not valid')
    } else {
      setCreditCardMonth(value.slice(0, 2))
      setCreditCardYear(value.slice(5, 7))
      setExpiryDateError('')
    }
  } */

  const cardCvcChange = (value: string) => {
    setCreditCardCVC(value)
    setInputWithFocus(CvcInputName)
  }

 
  const handleSubmitchange = (event: React.FormEvent<HTMLFormElement>)  => {
    event.preventDefault()
    window.mp.checkout()
  }

  return (
    <React.Fragment>
      <div className={styles.back} >
        <div className={styles.organizar} >
          <div className={styles.caja} >
            <div className={styles.sortUp} >
              <img className={styles.LogoMP} src={Logo} alt='' />
              <div className={styles.Details} >
                <h4>Detalles de la compra</h4>
              </div>
              <div className={styles.Price} >
                <h4>Precio</h4>
              </div>
            </div>
            <form className={styles.form} onSubmit={handleSubmitchange}  id="form-checkout">
              <div className={styles.form__group}>
                <label htmlFor='name' className={styles.form__label} >Nombre Completo</label>
                <input
                  id= "form-checkout__cardholderName"
                  className={styles.form__field}
                  name='name'
                  type='text'
                  required={true}
                  placeholder='Nombre completo'
                  minLength={5}
                  maxLength={30}
                  onChange={nameChange}
                />
              </div>
              <div className={styles.form__group}>
                <label htmlFor='email' className={styles.form__label}  >E-Mail</label>
                <input
                  id= "form-checkout__cardholderEmail"
                  className={styles.form__field}
                  name='email'
                  type='email'
                  value={user?.email}
                  required={true}
                  placeholder='E-Mail'
                  minLength={10}
                  maxLength={30}
                  onChange={emailChange}
                />
              </div>
              <div className={styles.sortBox} >
                <label className={styles.labelSelect} >Tipo de Documento</label>
                <div className={styles.box}>
                  <select
                    name='TiposDocumentacion'
                    required={true}
                    placeholder='Tipo de Documento'
                    onSelect={typedocChange}
                    id= "form-checkout__identificationType"
                  >
                    <option className={styles.options} >DNI</option>
                    <option className={styles.options} >CI</option>
                    <option className={styles.options} >LC</option>
                    <option className={styles.options} >LE</option>
                    <option className={styles.options} >OTRO</option>
                  </select>
                </div>
              </div>
              <div className={styles.form__group}>
                <label htmlFor='address' className={styles.form__label}  >Número de Documento ( sin . )</label>
                <input
                  id= "form-checkout__identificationNumber"
                  className={styles.form__field}
                  name='NumberDocument'
                  type='text'
                  required={true}
                  placeholder='Numero de Documento'
                  minLength={8}
                  maxLength={8}
                  onChange={documentChange}
                />
              </div>
              <div className={styles.form__group}>
                <label htmlFor='address' className={styles.form__label}  >Dirección</label>
                <input
                  className={styles.form__field}
                  name='Direccion'
                  type='text'
                  required={true}
                  placeholder='Direccion'
                  minLength={5}
                  maxLength={30}
                />
              </div>
              <div className={styles.form__group}>
                <label htmlFor='city' className={styles.form__label}  >Ciudad</label>
                <input
                  className={styles.form__field}
                  name='city'
                  type='text'
                  required={true}
                  placeholder='Ciudad'
                  maxLength={20}
                />
              </div>
              <div className={styles.form__group}>
                <label htmlFor='state' className={styles.form__label}  >Provincia</label>
                <input
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
                  className={styles.form__field}
                  name='postal_code'
                  type='text'
                  required={true}
                  placeholder='Codigo Postal / ZIP'
                  minLength={3}
                  maxLength={5}
                />
              </div>
            {/*   <div className={styles2.card}>
                <div className={styles2.inner}>
                  <CardImage type={cardType} />
                  <CardInput
                    name={CardNumberInputName}
                    id= "form-checkout__cardNumber"
                    placeholder="Número de Tarjeta"
                    onChange={cardNumberChanged}
                    isValid={isValidNumberOrEmpty}
                    formatValue={formatCreditCardNumber}
                    isComplete={isCardNumberComplete}
                    gotoNextField={gotoNextField}
                    hasFocus={inputWithFocus === CardNumberInputName}
                  />
                </div>
                <div className={styles2.inner2} >
                  <div className={styles.formYearMonth}>
                    <input
                      className={styles.formYearMonthIn}
                      placeholder='Mes de vencimiento'
                      id= "form-checkout__cardExpirationMonth"
                      name='month'
                      type='text'
                      
                      required={true}
                      minLength={2}
                      maxLength={2}
                    />
                  </div>
                  <div className={styles.formYearMonth}>
                    <input
                      className={styles.formYearMonthIn}
                      id= "form-checkout__cardExpirationYear"
                      name='Year'
                      type='text'
                      placeholder='Año de vencimiento'
                      required={true}
                      minLength={2}
                      maxLength={2}
                    />
                  </div>
                  <CardInput
                    id= "form-checkout__securityCode"
                    name={CvcInputName}
                    placeholder="CVC"
                    onChange={cardCvcChange}
                    isValid={isValidCvc}
                    formatValue={(value) => value}
                    isComplete={isCvcComplete}
                    gotoNextField={gotoNextField}
                    hasFocus={inputWithFocus === CvcInputName}
                  />
                </div>
              </div> */}
              <div className={styles.SortEnd}>
                <div className={styles.sortBoxBank} >
                  <label className={styles.labelSelectBank} >Banco</label>
                  <div className={styles.boxBank}>
                    <select
                      name='Banco'
                      id= "form-checkout__issuer"
                      required={true}
                      placeholder='Elige tú Banco'
                      onChange={banckChange}
                    >
                      <option className={styles.options} >Banco Ciudad</option>
                      <option className={styles.options} >Banco Frances</option>
                      <option className={styles.options} >Banco Patagonia</option>
                      <option className={styles.options} >HSBC</option>
                      <option className={styles.options} >Banco Credicoop</option>
                      <option className={styles.options} >Macro</option>
                      <option className={styles.options} >Citibank</option>
                      <option className={styles.options} >ICBC</option>
                    </select>
                  </div>
                </div>
                <div className={styles.sortBoxCuot} >
                  <label className={styles.labelSelectCuot} >Cuotas</label>
                  <div className={styles.boxCuot}>
                    <select
                      name='Cuotas'
                      required={true}
                      placeholder='Cuotas'
                      onChange={quotaChange}
                      id= "form-checkout__installments"
                    >
                      <option className={styles.options} >1</option>
                      <option className={styles.options} >3</option>
                      <option className={styles.options} >6</option>
                      <option className={styles.options} >12</option>
                      <option className={styles.options} >24</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className={styles.organizarbotones} >
                <button className={styles.boton} type='submit'  >Comprar</button>
              </div>
            </form>
          </div>
        </div >
      </div >
    </React.Fragment >
  )
}

export default Mercado