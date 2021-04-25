import { gql } from "@apollo/client"


export const GET_ORDER_LIST = gql`

query ($idUser: ID!){
  getOrdersByIdUser (idUser:$idUser) {
      id
      status  
      createdAt
      details{      
        id
        ProductId
        quantity
        price
        productName
        
      }

  }
}`;


export const EDIT_ORDER = gql`
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

export const EDIT_ORDER_DETAIL = gql`
mutation($id:ID!, $quantity:Int, $price:Float){
  editOrderDetail( id:$id,input:{
  quantity:$quantity
    price:$price
    
  }
    )
      {
        id
        quantity
        price
        
      }
  }    
`;


export const DELETE_ORDER_DETAIL = gql`
mutation($id:ID!){
  deleteOrderDetail(id:$id)       
      {
        id
        
      }
  }
`;
