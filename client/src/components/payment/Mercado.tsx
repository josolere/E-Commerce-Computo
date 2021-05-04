import React, { useEffect, useState, useRef } from 'react';
import styles from './Payment.module.scss';
import { useMutation, useQuery } from '@apollo/client';
import Logo from '../images/MercadoPago.png';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
/* import {
    isValidNumberOrEmpty,
    formatCreditCardNumber,
    isCardNumberComplete,
    isValidDateOrEmpty,
    isCardExpiryDateValid,
    formatExpiryDate,
    isCvcComplete,
    isValidCvc,
} from './CreditCard/numberUtils';
import CardInput from './CreditCard/CardInput';
import CardImage from './CreditCard/CardImage';
import CardType from './CreditCard/CardType'; */
import {
    faEnvelopeSquare,  faPassport,
    faAddressBook, faSignature, faCalendar,
     faCreditCard, faUniversity, faMoneyCheck
}
    from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

var mercadopago = require('mercadopago');

declare global {
    interface Window {
        Mercadopago: any;
    }
}

type SelectEvent = React.FormEvent<HTMLSelectElement>;

const Mercado = () => {

    const priceTotal = useSelector((store: AppState) => store.shoppingCartReducer.priceSubTotal)


    const [personalData, setPersonalData] = useState({
        email: '',
        docNumber: ''
    })

    const [docType, setDocType] = useState('')

    const [creditCardData, setCreditCardData] = useState({
        cardholderName: '',
        cardExpirationMonth: '',
        cardExpirationYear: '',
        securityCode: '',
    })

    const [numberCredit, setNumberCredit] = useState<any>({
        cardNumber: ''
    })

    const [otherCreditCardData, setOtherCreditCardData] = useState({
        issuer_id: '',
        installments: ''
    })

    const [issuersId, setIssuersId] = useState('')

    const [tokenId, setTokenId] = useState('')

    const handlePersonalData = (event: React.FormEvent<HTMLInputElement>) => {
        setPersonalData({ ...personalData, [event.currentTarget.name]: event.currentTarget.value })
    }

    const handleCreditCardData = (event: React.FormEvent<HTMLInputElement>) => {
        setCreditCardData({ ...creditCardData, [event.currentTarget.name]: event.currentTarget.value })
    }

    const handleDocType = (event: SelectEvent) => {
        setDocType(event.currentTarget.value)
    }

    const handleOtherCreditData = (event: SelectEvent) => {
        setOtherCreditCardData({ ...otherCreditCardData, [event.currentTarget.name]: event.currentTarget.value })
    }

    useEffect(() => {
        window.Mercadopago.setPublishableKey('TEST-87ab35ee-8f0f-46ec-a9c2-c7bbd03e98d4');
        window.Mercadopago.getIdentificationTypes()
    }, [])

    const guessPaymentMethod = (e: React.FormEvent<HTMLInputElement>) => {
        setNumberCredit(e.currentTarget.value)
        let cardnumber = e.currentTarget.value;
        if (cardnumber.length >= 6) {
            let bin = cardnumber.substring(0, 6);
            window.Mercadopago.getPaymentMethod({
                'bin': bin
            }, setPaymentMethod);
        }
    };

    let paymentMethodId: string

    function setPaymentMethod(status: any, response: any) {
        console.log('ResponsePay', response[0])
        if (status === 200) {
            let paymentMethod = response[0];
            paymentMethodId = paymentMethod.id
            getIssuers(paymentMethodId);
        } else {
            alert(`payment method info error: ${response}`);
        }
    }

    function getIssuers(paymentMethodId: string) {

        window.Mercadopago.getIssuers(
            paymentMethodId,
            setIssuers
        );
    }

    function setIssuers(status: any, response: any) {
        console.log('Response Banks', response)
        if (status === 200) {
            let issuerSelect: any
            issuerSelect = document.getElementById('issuer');
            issuerSelect.length = 0
            response.forEach((issuer: any) => {
                let opt = document.createElement('option');
                opt.text = issuer.name;
                opt.value = issuer.id;
                issuerSelect?.appendChild(opt);
                setIssuersId(issuerSelect.value)
            });
            getInstallments(
                paymentMethodId,
                priceTotal,
                issuerSelect.value
            );
        } else {
            alert(`issuers method info error: ${response}`);
        }
    }

    function getInstallments(paymentMethodId: string, priceTotal: any, issuerId: string) {
        console.log('Is', issuerId)
        window.Mercadopago.getInstallments({
            "payment_method_id": paymentMethodId,
            "amount": parseFloat(priceTotal),
            "issuer_id": parseInt(issuersId)
        }, setInstallments);
    }

    function setInstallments(status: any, response: any) {
        console.log('Installments', response)
        if (status == 200) {
            let installments: any = null
            installments = document.getElementById('installments');
            installments.length = 0
            response[0].payer_costs.forEach((payerCost: any) => {
                let opt = document.createElement('option');
                opt.text = payerCost.recommended_message;
                opt.value = payerCost.installments;
                installments?.appendChild(opt);
            });
        } else {
            alert(`installments method info error: ${response}`);
        }
    }

    let doSubmit = false;

    const getCardToken = () => {
        if (!doSubmit) {
            let $form = document.getElementById('paymentForm');
            window.Mercadopago.createToken($form, setCardTokenAndPay);
            return false;
        }
    }

    function setCardTokenAndPay(status: any, response: any) {
        setTokenId(response.id)
        console.log('Response', response)        

    };

    const handlesubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

    }

    return (
        <React.Fragment>
            <div className={styles.back} >
                <div className={styles.organizar} >
                    <div className={styles.caja} >
                        <div className={styles.sortUp} >
                            <img className={styles.LogoMP} src={Logo} alt='' />
                            <div className={styles.Details} >
                            </div>
                            <form className={styles.form} onSubmit={handlesubmit} id="paymentForm">
                                <h3>Detalles del comprador</h3>
                                <div className={styles.form__group}>
                                    <div className={styles.form__group}>
                                        <label className={styles.form__label} htmlFor="email">
                                            <FontAwesomeIcon icon={faEnvelopeSquare} /> E-mail</label>
                                        <input
                                            className={styles.form__field}
                                            id="email"
                                            name="email"
                                            type="text"
                                            onChange={handlePersonalData}
                                            required={true}
                                        />
                                    </div>
                                    <div className={styles.sortBox} >
                                        <label htmlFor="docType"
                                            className={styles.labelSelect}
                                        >
                                            <FontAwesomeIcon icon={faPassport} /> Tipo de documento</label>
                                        <div className={styles.box}>
                                            <select
                                                id="docType"
                                                name="docType"
                                                data-checkout="docType"
                                                onChange={handleDocType}
                                                required={true}
                                            ></select>
                                        </div>
                                    </div>
                                    <div className={styles.form__group}>
                                        <label
                                            className={styles.form__label}
                                            htmlFor="docNumber"
                                        ><FontAwesomeIcon icon={faAddressBook} />Número de documento
                                        </label>
                                        <input
                                            minLength={8}
                                            maxLength={8}
                                            className={styles.form__field}
                                            id="docNumber"
                                            name="docNumber"
                                            onChange={handlePersonalData}
                                            data-checkout="docNumber"
                                            required={true}
                                            type="text" />
                                    </div>
                                </div>
                                <h3>Detalles de la tarjeta</h3>
                                <div>
                                    <div className={styles.form__group}>
                                        <label
                                            className={styles.form__label}
                                            htmlFor="cardholderName"
                                        ><FontAwesomeIcon icon={faSignature} />Titular de la tarjeta
                                        </label>
                                        <input
                                            className={styles.form__field}
                                            id="cardholderName"
                                            data-checkout="cardholderName"
                                            name='cardholderName'
                                            type="text"
                                            onChange={handleCreditCardData}
                                            required={true} />
                                    </div>
                                    <div className={styles.form__group}>
                                        <label
                                            className={styles.form__label}
                                            htmlFor="">
                                            <FontAwesomeIcon icon={faCalendar} /> Fecha de vencimiento
                                        </label>
                                        <div>
                                            <input
                                                minLength={2}
                                                maxLength={2}
                                                className={styles.form__field}
                                                type="text"
                                                placeholder="Mes"
                                                name='cardExpirationMonth'
                                                onChange={handleCreditCardData}
                                                id="cardExpirationMonth"
                                                data-checkout="cardExpirationMonth"
                                                onSelect={() => false} onPaste={() => false}
                                                onCopy={() => false} onCut={() => false}
                                                onDrag={() => false} onDrop={() => false}
                                                required={true} />
                                            <span className="date-separator">/</span>
                                            <input
                                                minLength={2}
                                                maxLength={2}
                                                className={styles.form__field}
                                                type="text"
                                                placeholder="Año"
                                                name='cardExpirationYear'
                                                onChange={handleCreditCardData}
                                                id="cardExpirationYear"
                                                data-checkout="cardExpirationYear"
                                                onSelect={() => false} onPaste={() => false}
                                                onCopy={() => false} onCut={() => false}
                                                onDrag={() => false} onDrop={() => false}
                                                required={true} />
                                        </div>
                                    </div>
                                    <div className={styles.form__group}>
                                        <label
                                            className={styles.form__label}
                                            htmlFor="cardNumber"
                                        ><FontAwesomeIcon icon={faCreditCard} />Número de la tarjeta
                                        </label>
                                        <input
                                            minLength={16}
                                            maxLength={16}
                                            className={styles.form__field}
                                            type="text"
                                            id="cardNumber"
                                            name='cardNumber'
                                            data-checkout="cardNumber"
                                            onChange={guessPaymentMethod}
                                            onSelect={() => false} onPaste={() => false}
                                            onCopy={() => false} onCut={() => false}
                                            onDrag={() => false} onDrop={() => false}
                                            required={true} />
                                    </div>
                                    <div className={styles.form__group}>
                                        <label
                                            className={styles.form__label}
                                            htmlFor="securityCode"
                                        ><FontAwesomeIcon icon={faCreditCard} />Código de seguridad
                                        </label>
                                        <input
                                            className={styles.form__field}
                                            id="securityCode"
                                            data-checkout="securityCode"
                                            type="text"
                                            onChange={handleCreditCardData}
                                            name='securityCode'
                                            onSelect={() => false} onPaste={() => false}
                                            onCopy={() => false} onCut={() => false}
                                            onDrag={() => false} onDrop={() => false}
                                            required={true} />
                                    </div>
                                    <div
                                        className={styles.sortBox}
                                        id="issuerInput">
                                        <label
                                            className={styles.labelSelect}
                                            htmlFor="issuer"
                                        ><FontAwesomeIcon icon={faUniversity} />Banco Emisor
                                        </label>
                                        <div
                                            className={styles.box} >
                                            <select
                                                id="issuer"
                                                name="issuer_id"
                                                onChange={handleOtherCreditData}
                                                data-checkout="issuer"
                                                required={true}>
                                                </select>
                                        </div>
                                    </div>
                                    <div
                                        className={styles.sortBox}
                                    >
                                        <label htmlFor="installments"
                                            className={styles.labelSelect}
                                        ><FontAwesomeIcon icon={faMoneyCheck} />Cuotas
                                        </label>
                                        <div
                                            className={styles.box}   >
                                            <select
                                                id="installments"
                                                onChange={handleOtherCreditData}
                                                name="installments"
                                                required={true}
                                            ></select>
                                        </div>
                                    </div>
                                    <div className={styles.sortEnd} >
                                        <h4>Precio de la compra</h4>
                                        <p>${new Intl.NumberFormat().format(priceTotal)}</p>
                                    </div>
                                    <div className={styles.sortEnd} >
                                        <input
                                            hidden={true}
                                            name="transactionAmount"
                                            id="transactionAmount"
                                            value={priceTotal} />
                                        <input name="paymentMethodId"
                                            hidden={true}
                                            id="paymentMethodId"
                                        />
                                        <input
                                            hidden={true}
                                            name="description"
                                            id="description"
                                            value={'Insumos de computación'} />
                                    </div>
                                    <div className={styles.organizarbotones} >
                                        <button
                                            className={styles.boton}
                                            onClick={getCardToken}
                                        >Comprar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </div>
        </React.Fragment>
    )
}

export default Mercado