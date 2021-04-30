import React, { FC, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { setCommentRange } from 'typescript';
import { MERCADO_PAGO } from "../../gql/mercadopago";
import { useMutation } from '@apollo/client';

declare global {
    interface Window {
        MercadoPago: any  //v2
    }
}

interface Props {}

/**
* @author 
* @function MP
**/

const MP:FC<Props> = (props) => {
    const [processPayment, results] = useMutation(MERCADO_PAGO);
    
    const mp = new window.MercadoPago('TEST-87ab35ee-8f0f-46ec-a9c2-c7bbd03e98d4', {locale: 'es-AR'})

    useEffect(() => {

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
                                     }).catch(error => console.log(error))


             
/*

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
    <form id="form-checkout" >
        <input type="text" name="cardNumber" id="form-checkout__cardNumber" />
        <input type="text" name="cardExpirationMonth" id="form-checkout__cardExpirationMonth" />
        <input type="text" name="cardExpirationYear" id="form-checkout__cardExpirationYear" />
        <input type="text" name="cardholderName" id="form-checkout__cardholderName"/>
        <input type="email" name="cardholderEmail" id="form-checkout__cardholderEmail"/>
        <input type="text" name="securityCode" id="form-checkout__securityCode" />
        <select name="issuer" id="form-checkout__issuer"></select>
        <select name="identificationType" id="form-checkout__identificationType"></select>
        <input type="text" name="identificationNumber" id="form-checkout__identificationNumber"/>
        <select name="installments" id="form-checkout__installments"></select>
        <button id="form-checkout__submit" type="submit">Pagar</button>

        <progress value="0" className="progress-bar">Cargando...</progress>
        </form>
   )
 }

MP.propTypes = {
// your expected props
}

MP.defaultProps = {
// your default props
}
export default MP