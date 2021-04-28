import React, { useEffect, useState, useRef } from 'react';
import Mercado from './MercadoPago';
var mercadopago = require('mercadopago');

declare global {
    interface Window {
        Mercadopago: any;
    }
}

type SelectEvent = React.FormEvent<HTMLSelectElement>;

const Test = () => {

    const [Mercado, setMercado] = useState()

    const [paymentMethodId, setPaymentMethodId] = useState('')

    const payment = useRef<HTMLInputElement>(null);

    const [issuers, setIssuerss] = useState('')

    const [amount, setAmoun] = useState(110)

    const [instalments, setInstalments] = useState()

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

    const handleChangeAmount = (e: React.FormEvent<HTMLInputElement>) => {
/*         setAmoun(e.currentTarget.value)
 */    }

    const handleIssuersChange = (e: SelectEvent) => {
        setIssuerss(e.currentTarget.value)
    }

    function setPaymentMethod(status: any, response: any, e: React.FormEvent<HTMLInputElement>) {
        if (status == 200) {
            let paymentMethod = response[0];
            setPaymentMethodId(paymentMethod.id)
            getIssuers(paymentMethod.id);
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
        if (status == 200) {
            let issuerSelect: any
            issuerSelect = document.getElementById('issuer');
            response.forEach((issuer: any) => {
                let opt = document.createElement('option');
                opt.text = issuer.name;
                opt.value = issuer.id;
                issuerSelect?.appendChild(opt);
            });

            getInstallments(
                paymentMethodId,
                amount,
                issuers
            );
        } else {
            alert(`issuers method info error: ${response}`);
        }
    }

    function getInstallments(paymentMethodId: string, amount: any, issuers: string) {
        window.Mercadopago.getInstallments({
            "payment_method_id": paymentMethodId,
            "amount": parseFloat(amount),
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
               alert(`installments method info error: ${response}`); 
        }
    }

    const handlesubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    let doSubmit = false;

    const getCardToken = () => {
        /*  document.getElementById('paymentForm').addEventListener('submit', getCardToken); */
        /*   event.preventDefault(); */
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
            <form onSubmit={handlesubmit} /* action="/process_payment" method="post" */ id="paymentForm">
                <h3>Detalles del comprador</h3>
                <div>
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <input id="email" name="email" type="text" />
                    </div>
                    <div>
                        <label htmlFor="docType">Tipo de documento</label>
                        <select id="docType" name="docType" data-checkout="docType" ></select>
                    </div>
                    <div>
                        <label htmlFor="docNumber">Número de documento</label>
                        <input id="docNumber" name="docNumber" data-checkout="docNumber" type="text" />
                    </div>
                </div>
                <h3>Detalles de la tarjeta</h3>
                <div>
                    <div>
                        <label htmlFor="cardholderName">Titular de la tarjeta</label>
                        <input id="cardholderName" data-checkout="cardholderName" type="text" />
                    </div>
                    <div>
                        <label htmlFor="">Fecha de vencimiento</label>
                        <div>
                            <input type="text" placeholder="MM" id="cardExpirationMonth" data-checkout="cardExpirationMonth"
                                onSelect={() => false} onPaste={() => false}
                                onCopy={() => false} onCut={() => false}
                                onDrag={() => false} onDrop={() => false} />
                            <span className="date-separator">/</span>
                            <input type="text" placeholder="YY" id="cardExpirationYear" data-checkout="cardExpirationYear"
                                onSelect={() => false} onPaste={() => false}
                                onCopy={() => false} onCut={() => false}
                                onDrag={() => false} onDrop={() => false} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="cardNumber">Número de la tarjeta</label>
                        <input type="text" id="cardNumber" data-checkout="cardNumber"
                            onSelect={() => false} onPaste={() => false}
                            onCopy={() => false} onCut={() => false} onChange={guessPaymentMethod}
                            onDrag={() => false} onDrop={() => false} />
                    </div>
                    <div>
                        <label htmlFor="securityCode">Código de seguridad</label>
                        <input id="securityCode" data-checkout="securityCode" type="text"
                            onSelect={() => false} onPaste={() => false}
                            onCopy={() => false} onCut={() => false}
                            onDrag={() => false} onDrop={() => false} />
                    </div>
                    <div id="issuerInput">
                        <label htmlFor="issuer">Banco emisor</label>
                        <select id="issuer" name="issuer" data-checkout="issuer" onChange={handleIssuersChange}></select>
                    </div>
                    <div>
                        <label htmlFor="installments">Cuotas</label>
                        <select id="installments" name="installments"></select>
                    </div>
                    <div>
                        <input name="transactionAmount" id="transactionAmount" value={amount} />
                        <input name="paymentMethodId" id="paymentMethodId" value={paymentMethodId} />
                        <input name="description" id="description" value={'algo'} />
                        <br />
                        <button onClick={getCardToken} >Pagar</button>
                        <br />
                    </div>
                </div>
            </form>
        </React.Fragment>
    )
}

export default Test