import { gql } from "@apollo/client"

export const FILTER =  gql`
    query ($name: String!, $categoriesId:[ID]){
        getProducts (filter:{name:$name categoriesId:$categoriesId}) {
            id
            name
            price
            image
            stock
            
        }
    }
`;
export const GET_PRODUCTS =  gql`
    query ($categoriesId:[ID]){
        getProducts (filter:{categoriesId:$categoriesId}) {
            id
            name
            price
            image
            stock 
        }
    }
`;