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

export const EDIT_ORDER = gql `
mutation($id:ID!,$status:String $city:String $street:String $state:String){
  editOrder(id:$id,input:{status:$status city:$city street:$street state:$state})
  {
    id
    status    
    street
    city
  }
}
`;
