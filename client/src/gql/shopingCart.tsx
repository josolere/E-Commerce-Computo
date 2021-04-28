import { gql } from "@apollo/client"


export const NEW_ORDER = gql`
mutation($status: String, $idUser:ID){
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
mutation($idProduct:ID, $idOrder:ID, $quantity:Int) {
    createOrderDetail( 
        idProduct:$idProduct,
        idOrder:$idOrder,
        quantity:$quantity
      ) {   
            ProductId
            id
            OrderId
            quantity
            price
        }
    }
    
`;

export const GET_ORDER = gql`
    query ($idUser: ID!){
        getOrdersByIdUser (idUser:$idUser) {
            id
            status
           
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
