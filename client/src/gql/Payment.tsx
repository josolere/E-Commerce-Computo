import { gql } from "@apollo/client"

export const MERCADO_PAGO = gql`
mutation ($token:String! $issuer_id:Number! $payment_method_id:String! $transaction_amount:Number! $installments:Number!
        $description:String! $email:String! $type:String $number:String!){
        mercadPago (token:$token issuer_id:$issuer_id payment_method_id:$payment_method_id transaction_amount: $transaction_amount
                    installments:$installments description:$description email:$email type:$type number:$number)
                    {
                        token
                    }
                }
`;

