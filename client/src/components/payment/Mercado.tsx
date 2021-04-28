import React, { useEffect, useState, useRef } from 'react';
import styles from './Payment.module.scss';
import { useMutation, useQuery } from '@apollo/client';
import Logo from '../images/MercadoPago.png';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers';
import {
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
import CardType from './CreditCard/CardType';
import {
    faEnvelopeSquare, faUnlock, faFileSignature, faMapMarker, faShareAlt, faPassport,
    faAddressBook, faSignature, faCalendar, faCreditCard, faPiggyBank, faUniversity, faMoneyCheck
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

    console.log(priceTotal)

    const [paymentMethodId, setPaymentMethodId] = useState('')

    const payment = useRef<HTMLInputElement>(null);

    const [issuers, setIssuerss] = useState('')

    const formatCreditCardNumber = (value: string) => {
        const isWhitespace = (char: string) => /\s/.test(char)
        const isIt5thChar = (i: number) => i % 4 === 0 && i > 0

        return value
            .trim()
            .split('')
            .filter((char) => !isWhitespace(char))
            .reduce((acc, char, i) => acc + (isIt5thChar(i) ? ' ' + char : char), '')
    }

    useEffect(() => {
        window.Mercadopago.setPublishableKey('TEST-f76736fb-f8c7-4bb1-a19e-ab2ab45eb887');
        window.Mercadopago.getIdentificationTypes()
    }, [])

    const guessPaymentMethod = (e: React.FormEvent<HTMLInputElement>) => {
        let cardnumber = e.currentTarget.value;
        if (cardnumber.length >= 6) {
            let bin = cardnumber.substring(0, 6);
            window.Mercadopago.getPaymentMethod({
                "bin": bin
            }, setPaymentMethod);
        }
    };

    const handleIssuersChange = (e: SelectEvent) => {
        setIssuerss(e.currentTarget.value)
    }

    function setPaymentMethod(status: any, response: any, e: React.FormEvent<HTMLInputElement>) {
        if (status == 200) {
            let paymentMethod = response[0];
            setPaymentMethodId(paymentMethod.id)
            getIssuers(paymentMethod.id);
        } else {
            /*  alert(`payment method info error: ${response}`); */
        }
    }

    function getIssuers(paymentMethodId: string) {
        window.Mercadopago.getIssuers(
            paymentMethodId,
            setIssuers
        );
    }

    function setIssuers(status: any, response: any) {
        if (status == 200) {
            let issuerSelect: any
            issuerSelect = document.getElementById('issuer');
            issuerSelect.length = 0
            response.forEach((issuer: any) => {
                let opt = document.createElement('option');
                opt.text = issuer.name;
                opt.value = issuer.id;
                issuerSelect?.appendChild(opt);
            });
            getInstallments(
                paymentMethodId,
                priceTotal,
                issuers
            );
        } else {
            /*  alert(`issuers method info error: ${response}`); */
        }
    }

    function getInstallments(paymentMethodId: string, priceTotal: any, issuers: string) {
        window.Mercadopago.getInstallments({
            "payment_method_id": paymentMethodId,
            "amount": parseFloat(priceTotal),
            "issuer_id": parseInt(issuers)
        }, setInstallments);
    }

    function setInstallments(status: any, response: any) {
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
            /*      alert(`installments method info error: ${response}`); */
        }
    }

    const handlesubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
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
        if (status == 200 || status == 201) {
            let form: any
            form = document.getElementById('paymentForm');
            let card = document.createElement('input');
            card.setAttribute('name', 'token');
            /*  card.setAttribute('type', 'hidden'); */
            card.setAttribute('value', response.id);
            form?.appendChild(card);
            doSubmit = true;
            /*  form?.submit(); */
        } else {
            alert("Verify filled data!\n" + JSON.stringify(response, null, 4));
        }
    };

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
                                            required={true}
                                        />
                                    </div>
                                    <div>
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
                                                    required={true}
                                                ></select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.form__group}>
                                        <label
                                            className={styles.labelSelect}
                                            htmlFor="docNumber"
                                        ><FontAwesomeIcon icon={faAddressBook} />Número de documento
                                        </label>
                                        <input
                                            minLength={8}
                                            maxLength={8}
                                            className={styles.form__field}
                                            id="docNumber"
                                            name="docNumber"
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
                                            type="text"
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
                                        ><FontAwesomeIcon icon={faUniversity} />Banco emisor
                                        </label>
                                        <div
                                            className={styles.box} >
                                            <select
                                                id="issuer"
                                                name="issuer"
                                                data-checkout="issuer"
                                                onChange={handleIssuersChange}
                                                required={true}></select>
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
                                                name="installments"
                                                required={true}
                                            ></select>
                                        </div>
                                    </div>
                                    <div>
                                        <input
                                            name="transactionAmount"
                                            id="transactionAmount"
                                            value={priceTotal} />
                                        <input name="paymentMethodId"
                                            id="paymentMethodId"
                                            value={paymentMethodId} />
                                        <input
                                            name="description"
                                            id="description"
                                            value={'algo'} />
                                        <br />
                                        <div className={styles.organizarbotones} >
                                            <button
                                                className={styles.boton}
                                                onClick={getCardToken}
                                            >Comprar</button>
                                        </div>
                                        <br />
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