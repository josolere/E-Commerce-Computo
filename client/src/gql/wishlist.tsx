import { gql } from "@apollo/client"

export const TOGGLE_WISHLIST = gql `
mutation($userId:String, $productId:ID){
    toggleWishlist(userId:$userId, productId: $productId){
      id
      name
      
    }
  }
`
export const WISHLIST = gql `
query($userId:String){
    getWishList(userId:$userId){
        id
        name
        image
        brand
        price
        stock
        
    }
}
`