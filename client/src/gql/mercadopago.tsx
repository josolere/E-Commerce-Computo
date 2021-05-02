import { gql } from "@apollo/client"


//    

export const MERCADO_PAGO = gql`
mutation ($token:String $issuer_id:String $payment_method_id:String  $transaction_amount:Float $installments:Int $email:String $type:String 
                        $number:String $description:String $id:ID! ) {
            processPayment( id:$id input: {
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
                        payment {
                            id
                            status
                            status_detail
                        }
                        error {
                            status
                            cause {
                                code
                                description
                            }
                        }
                    }
                }
`;


export const CURRENT_ORDER = gql ` 
    query ($idUser: ID $status:String) {
        getOrderByStatus(idUser:$idUser status:$status)
        {
            id
        }
    }
`;
