import { gql } from "apollo-server";

export const typeDefs = gql`
  # object querys mutations RECORDAR USAR MAYÚSCULAS

  type ResultPayment {
    status:Int
    payment: Payment
    error:PaymentError
  }

  type Payment {
    id:Int
    status: String
    status_detail: String
  }
  
  type PaymentError {
    status: Int
    cause:Cause
  }

  type Cause {
    code: Int
    description: String
  }

  type Mutation {
    processPayment( id:ID!, input:CreatePaymentDataInput):ResultPayment
  }


  input CreatePaymentDataInput {
    token: String
    issuer_id: String
    payment_method_id: String
    transaction_amount: Float
    installments: Int
    description: String
    email: String
    payer: Payer
  }

  input Payer {
    email: String
    identification: Identification
  }

  input Identification {
    type: String
    number: String
  }

`;
