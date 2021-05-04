import { gql } from "@apollo/client"

export const ADD_COMPATIBILITIES = gql`
mutation addCompatibilities ($HeadIdProduct: ID, $idsProducts:[ID] ){
    createCompatibility(HeadIdProduct:$HeadIdProduct , idsProducts:$idsProducts){
     name
     id
   }
 }
`;


export const GET_PRODUCT_COMPATIBILITIES = gql`
query ($idProduct:ID){
    getProductsCompatibilities(idProduct:$idProduct) {
    name
    image
  	price
    id
     }
  }
`

/* export const getProductsBuild =  gql`
    query {
        getProductsBuild {
            id
            name
            brand
            price
            image
            categories{
                name
            }
        }
    }
`; */