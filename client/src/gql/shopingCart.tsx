import { gql } from "@apollo/client"


export const NEW_ORDER = gql`
mutation($status: String!, $idUser:[Int]!){
    createOrder( input:{
    status:$status
    }
    idUser:$idUser
      )
        {
            id
            status
        }
    }
    
`;

export const NEW_ORDER_DETAIL = gql`
mutation($idProduct:[Int]!, $idOrder:[Int]!, $quantity:[Int]!) {
    createOrderDetail( 
        idProduct:$idProduct,
        idOrder:$idOrder,
        quantity:$quantity
      ) {   
            ProductId
            id
            OrderID
            quantity
            price
        }
    }
    
`;


export const PRODUCTS = gql`
    query ($id: ID!){
        getProductById (id:$id) {
            id
            name
            price
            image
            details
        }
    }
`;
