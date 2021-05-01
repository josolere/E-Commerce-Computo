import { gql } from "@apollo/client"


//    

export const MERCADO_PAGO = gql`
mutation ($token:String $issuer_id:String $payment_method_id:String  $transaction_amount:Float $installments:Int $email:String $type:String $number:String $description:String ) {
            processPayment( input: {
                                token: $token
                                issuer_id: $issuer_id 
                                payment_method_id:$payment_method_id 
                                transaction_amount: $transaction_amount
                                installments:$installments 
                                description:$description 
                                payer: { 
                                        email: $email 
                                        identification : {
                                            type:$type 
                                            number:$number 
                                        }
                                }
                        }
                        )

                    {
                        status
                    }
                }
`;

