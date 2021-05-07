import { gql } from "@apollo/client"

export const GET_ALL_ORDERS =  gql `
query($status:String){
  getAllOrders(status:$status){
    id
    status
    UserId
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
    confirmAt
    details{
      id
      quantity
      price
      productName
      ProductId
      
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
    createdAt
    details{
      id
      ProductId
      productName
      OrderId
      price
      quantity

      
    }
  }
}`

export const LOGOUT = gql `
  mutation {
      logout
          }`;

export const CREATE_ORDER = gql `
mutation($status:String,$idUser:ID){
  createOrder(input:{status:$status},idUser:$idUser){
    id
    status

    
  }
}
`

export const CREATE_ORDER_DETAIL = gql `
mutation($idOrder:ID,$idProduct:ID,$quantity:Int){
  createOrderDetail(
  	idOrder:$idOrder
    idProduct:$idProduct
    quantity:$quantity
  ){
    id
    quantity
    price
    OrderId
    ProductId
    
  }
}
`

export const GET_ORDER_BY_STATUS = gql`
query($status:String!, $idUser:ID) {
  getOrderByStatus (status:$status, idUser:$idUser) {
      id,
      details{
        id
        OrderId
        quantity
        price
        productName
        ProductId        
      }        
      }
  }
`
