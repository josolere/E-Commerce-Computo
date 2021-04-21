import { gql } from "@apollo/client"


export const GET_ORDER_DETAILS = gql`
query($id:ID!){
    getOrderById(id:$id){
      id
      status
      details{
        id
        quantity
        price
        ProductId
        OrderId
        
    }}}
  `;

export const EDIT_ORDER = gql `
mutation($id:ID!,$status:String){
  editOrder(id:$id,input:{status:$status}){
    id
    status
    
  }
}
`