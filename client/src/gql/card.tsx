import { gql } from "@apollo/client"

export const FILTER =  gql`
    query ($name: String!, $categoriesId:[ID]){
        getProducts (filter:{name:$name categoriesId:$categoriesId}) {
            id
            name
            price
            image
        }
    }
`;