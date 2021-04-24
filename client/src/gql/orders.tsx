import { gql } from "@apollo/client"

export const GET_ALL_ORDERS =  gql `
query($status:String){
  getAllOrders(status:$status){
    id
    status
    details{
      id
      quantity
      price
      productName
      
    }

  }

}
`

export const GET_ORDER_DETAILS = gql`
query($id:ID!){
    getOrderById(id:$id){
      id
      status
      details{
        id
        quantity
        price
        
    }

  }
}
  `;

export const EDIT_ORDER = gql `
mutation($id:ID!,$status:String){
  editOrder(id:$id,input:{status:$status}){
    id
    status
    
  }
}
`

export const GET_ORDERS_USER = gql `
query($idUser:ID!){
  getOrdersByIdUser(idUser:$idUser){
    id
    status
    details{
      id
      productName
      OrderId
      price
      quantity
      
    }
  }
}
`