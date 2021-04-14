import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

/* const StripePromise = loadStripe('pk_test_51IfpazHObBDKzBSGun3Clgf3wbyo1QMxk6jwHwDwLPoxZTrfGCASzt1R8yDvUMTPqL8dmE4CIUgP8Qr0BqqwAFPq00RZ1Ulyai')
 */

const StripePay = ():JSX.Element => {

    const stripe = useStripe()

    const elements = useElements()

    let cardElement:any
    
    cardElement = {token:"444"}

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault()
    
        if (!stripe || !elements) {
            return;
        }else {
         cardElement =  elements?.getElement(CardElement);
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement
          });

          if (error) {
            console.log('[error]', error);
          } else {
            console.log('[PaymentMethod]', paymentMethod);
          }
        };

    return (
        <form onSubmit={handleSubmit} >
            <CardElement />
            <button type='submit' disabled={!stripe} >Comprar</button>
        </form>

    )
}

export default StripePay