import { gql } from "@apollo/client"

export const getProductsBuild =  gql`
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
`;